// ================================================
// STOCK WHITE – MAIN JAVASCRIPT (Google Sheets DB)
// ================================================

// Mobile menu toggle (burger icon)
document.querySelector('.burger')?.addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.toggle('active');
});

// Close with X button
document.querySelector('.mobile-menu__close')?.addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.remove('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.remove('active');
  });
});

// Global variable to store all data from Google Sheets
let allData = { categories: [], products: [] };

// Your Google Apps Script Web App URL (replace only if you make new deployment)
const SHEET_URL = "https://script.google.com/macros/s/AKfycbwoJ6UAtw3SnNYaPbwgpiI2swLmh_hDtVzcEyROEcR48Ifh7FgwUqRErJXnk1Emb-ln/exec";

// ================================================
// 1. LOAD DATA FROM GOOGLE SHEETS
// ================================================
async function loadData() {
  // Show loading spinner on products page
  const productsGrid = document.getElementById("productsGrid");
  if (productsGrid) {
    productsGrid.innerHTML = `
      <div class="loading-spinner">
        <p>Loading products...</p>
      </div>
    `;
  }

  try {
    // Fetch JSON from your Google Sheet via Apps Script
    const response = await fetch(SHEET_URL + "?t=" + Date.now()); // cache buster
    if (!response.ok) throw new Error("Network error");

    // Parse the JSON response → becomes allData.categories & allData.products
    allData = await response.json();

    // Data loaded successfully → now render everything
    if (document.getElementById("productsGrid")) {
      renderProducts();           // Show products grid
      setupFilterButtons();       // Make filter buttons work
    }
    if (document.querySelector('.product-details-page')) {
      loadProductDetails();       // Load current product on details page
    }

  } catch (error) {
    console.error("Failed to load data from Google Sheets:", error);
    if (productsGrid) {
      productsGrid.innerHTML = `<div class="no-products"><p>Failed to load products. Please try again later.</p></div>`;
    }
  }
}

// ================================================
// 2. RENDER PRODUCTS GRID
// ================================================
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  // Filter products by category_code
  let filtered = filter === "all"
    ? allData.products
    : allData.products.filter(p => p.category_code === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-products"><p>No products available in this category yet.</p></div>`;
  } else {
    grid.innerHTML = filtered.map(product => `
      <div class="product-card" onclick="openProductDetails('${product.code}')">
        <img src="${product.images[0] || 'images/hero.jpg'}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Brand: ${product.brand}</p>
        <p class="price">
        ${product.sale_price > 0 && product.sale_price < product.price
        ? `<del>EG ${product.price}</del> <strong>EG ${product.sale_price}</strong>`
        : `EG ${product.price}`
      }
</p>
      </div>
    `).join('');
  }
}

// ================================================
// 3. OPEN PRODUCT DETAILS PAGE
// ================================================
function openProductDetails(productCode) {
  localStorage.setItem('currentProductCode', productCode);
  window.location.href = 'product-details.html';
}

// ================================================
// 4. SETUP CATEGORY FILTER BUTTONS من الداتابيز + Placeholder
// ================================================
function setupFilterButtons() {
  const filterContainer = document.getElementById('categoryFilter');
  const placeholder = filterContainer.querySelector('.filter-placeholder');

  // ننظف أي أزرار قديمة (لو موجودة)
  filterContainer.innerHTML = '';

  // زر "All" الأول دايمًا
  const allBtn = document.createElement('button');
  allBtn.className = 'filter-btn active';
  allBtn.dataset.category = 'all';
  allBtn.textContent = 'All';
  allBtn.onclick = () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    renderProducts('all');
  };
  filterContainer.appendChild(allBtn);

  // نجيب الأقسام من الداتابيز ونضيف زر لكل قسم
  allData.categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.category = cat.code;
    btn.textContent = cat.name;
    btn.onclick = () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(cat.code);
    };
    filterContainer.appendChild(btn);
  });

  // نخفي الـ placeholder ونظهر الأزرار الحقيقية
  filterContainer.classList.add('loaded');
  placeholder?.remove();
}

// ================================================
// 5. PRODUCT DETAILS PAGE – مع Placeholder أثناء التحميل
// ================================================
function loadProductDetails() {
  const code = localStorage.getItem('currentProductCode');
  const product = allData.products.find(p => p.code === code);

  if (!product) {
    document.body.innerHTML = "<h2 style='text-align:center;padding:100px;'>Product not found</h2>";
    return;
  }

  // إخفاء الـ placeholder وإظهار المحتوى الحقيقي
  document.querySelectorAll('.placeholder-glow').forEach(el => {
    el.classList.remove('placeholder-glow');
    el.querySelectorAll('.placeholder-line').forEach(line => line.remove());
  });

  // إظهار الصورة الكبيرة
  document.querySelector('.image-placeholder').style.display = 'none';
  const bigImage = document.getElementById('bigImage');
  bigImage.style.display = 'block';
  bigImage.src = product.images[0] || '';

  // تعبئة البيانات
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productBrand').textContent = product.brand;
  document.getElementById('productCode').textContent = product.code;
  // Replace the old price line with this
  const priceContainer = document.getElementById('productPrice');

  if (product.sale_price > 0 && product.sale_price < product.price) {
    priceContainer.innerHTML = `
    <div class="sale-price-wrapper">
      <span class="old-price">EG ${product.price}</span>
      <span class="sale-badge">SALE</span>
      <div class="new-price">EG ${product.sale_price}</div>
    </div>
  `;
  } else {
    priceContainer.innerHTML = `<div class="new-price">EG ${product.price}</div>`;
  }

  // معرض الصور الصغير
  const thumbContainer = document.querySelector('.thumbnail-slider');
  thumbContainer.innerHTML = '';
  product.images.forEach((img, i) => {
    const imgEl = document.createElement('img');
    imgEl.src = img;
    if (i === 0) imgEl.classList.add('active');
    imgEl.onclick = () => {
      bigImage.src = img;
      document.querySelectorAll('.thumbnail-slider img').forEach(t => t.classList.remove('active'));
      imgEl.classList.add('active');
    };
    thumbContainer.appendChild(imgEl);
  });

  // المقاسات (نفس الكود اللي فات)
  const sizesContainer = document.getElementById('sizesContainer');
  sizesContainer.innerHTML = '';

  product.sizes.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'size-btn';
    btn.textContent = s.size;
    btn.dataset.size = s.size;

    if (s.quantity > 0) {
      btn.classList.add('available');
      btn.onclick = () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      };
    } else {
      btn.classList.add('sold-out');
      btn.disabled = true;
    }
    sizesContainer.appendChild(btn);
  });

  const firstAvailable = document.querySelector('.size-btn.available');
  if (firstAvailable) firstAvailable.classList.add('active');
}


// ================================================
// 6. RENDER CATEGORIES GRID – أول حاجة تتحمل في الموقع
// ================================================
async function renderCategoriesFirst() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return; // لو مش في index.html

  // لو البيانات لسه ما اتحملتش → نعمل fetch سريع للأقسام بس
  if (allData.categories.length === 0) {
    try {
      const response = await fetch(SHEET_URL + "?t=" + Date.now());
      const data = await response.json();
      allData.categories = data.categories || [];
    } catch (e) {
      console.error("Failed to load categories");
    }
  }

  // ننظف الـ placeholder
  grid.innerHTML = '';
  grid.classList.add('loaded');

  // نرسم كل قسم
  allData.categories.forEach(cat => {
    const card = document.createElement('a');
    card.href = `products.html?category=${cat.code}`;
    card.className = 'category-card';

    card.innerHTML = `
      <img src="${cat.cover_image || 'https://via.placeholder.com/600x800/eee/ccc?text=No+Image'}" 
           alt="${cat.name}" loading="lazy">
      <div class="overlay">
        <h3>${cat.name}</h3>
      </div>
    `;

    grid.appendChild(card);
  });

  // لو مفيش أقسام
  if (allData.categories.length === 0) {
    grid.innerHTML = `<p style="grid-column:1/-1; text-align:center; padding:80px; color:#999; font-size:18px;">
      No categories available yet.
    </p>`;
  }
}

// ================================================
// 7. تحميل البيانات العادي (منتجات + أقسام) – بعد الأقسام
// ================================================
async function loadFullData() {
  try {
    const response = await fetch(SHEET_URL + "?t=" + Date.now());
    const data = await response.json();
    allData.categories = data.categories || [];
    allData.products = data.products || [];

    // بعد ما كل حاجة اتحملت → نعمل باقي الشغل
    if (document.getElementById("productsGrid")) {
      renderProducts();
      setupFilterButtons();
    }
    if (document.querySelector('.product-details-page')) {
      loadProductDetails();
    }
  } catch (e) {
    console.error("Failed to load full data", e);
  }
}

// ================================================
// 8. START – الأقسام أولاً، ثم باقي الموقع
// ================================================
document.addEventListener("DOMContentLoaded", async () => {
  // 1. نرسم الأقسام فورًا (أولوية قصوى)
  await renderCategoriesFirst();

  // 2. بعد كده نحمل باقي البيانات عادي
  await loadFullData();
});


// ////////////////////////////////////

// === SCROLLING PROMOTION BAR FROM GOOGLE SHEETS ===
async function loadPromotionBar() {

  try {
    const response = await fetch(SHEET_URL + "?t=" + Date.now()); // cache bust
    const data = await response.json();

    const track = document.getElementById("promotionTrack");
    track.innerHTML = ""; // clear loading

    if (!data.promotions || data.promotions.length === 0) {
      track.innerHTML = '<div class="promotion-item"><span>Ready To The Next Level</span></div>';
      return;
    }

    // Build items (duplicate for seamless loop)
    const itemsHTML = data.promotions.map(item => {
      if (item.image) {
        return `<div class="promotion-item"><img src="${item.image}" alt="Promotion"></div>`;
      } else {
        return `<div class="promotion-item"><span>${item.text}</span></div>`;
      }
    }).join("");

    // Duplicate twice for perfect infinite scroll
    track.innerHTML = itemsHTML + itemsHTML;

  } catch (error) {
    console.error("Failed to load promotion bar:", error);
    document.getElementById("promotionTrack").innerHTML = 
      '<div class="promotion-item"><span>Free Shipping on All Orders!</span></div>' +
      '<div class="promotion-item"><span>FREE SHIPPING WORLDWIDE</span></div>';
  }
}

// Load on page ready
document.addEventListener("DOMContentLoaded", loadPromotionBar);
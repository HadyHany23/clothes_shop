// Mobile menu toggle
document.querySelector('.burger').addEventListener('click', () => {
  document.querySelector('.mobile-menu').classList.toggle('active');
});

// Close menu when clicking a link (optional)
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.mobile-menu').classList.remove('active');
  });
});

// Fake products data
const products = [
  { name: "White Oversized Shirt",     price: "$89",   category: "women",      img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800" },
  { name: "Minimal Black Blazer",      price: "$189",  category: "women",      img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800" },
  { name: "Linen Summer Dress",        price: "$129",  category: "men",      img: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800" },
  { name: "Tailored Wool Coat",        price: "$279",  category: "men",        img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800" },
  { name: "Classic White Sneakers",    price: "$119",  category: "men",        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800" },
  { name: "New Silk Scarf",            price: "$95",   category: "new",        img: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800" },
];

// Render all products
function renderProducts(filter = "all") {
  const grid = document.getElementById("productsGrid");
  if (!grid) return;

  const filtered = filter === "all" ? products : products.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-products">
        <p>No products available in this category yet.</p>
      </div>
    `;
  } else {
    grid.innerHTML = filtered.map(product => `
      <div class="product-card">
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p class="price">${product.price}</p>
      </div>
    `).join('');
  }
}

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');
    renderProducts(btn.dataset.category);
  });
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
});
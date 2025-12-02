function loadFooter() {
  const footerHTML = `
    <!-- FOOTER -->
    <footer class="footer">
        <div class="container footer-inner">

            <!-- Logo + short text -->
            <div class="footer-col">
                <div class="logo footer-logo">Stock White</div>
                <p>Timeless minimal fashion<br>Designed in 2025</p>
            </div>

            <!-- Social icons -->
            <div class="footer-col footer-social">
                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="Tiktok"><i class="fa-brands fa-tiktok"></i></a>
                <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>

            <!-- Contact info -->
            <div class="footer-col footer-contact">
                <p><i class="fas fa-phone-alt"></i> 01115599998</p>
                <p><i class="fa-solid fa-location-dot"></i> stockwhite</p>
            </div>

        </div>

        <!-- Copyright -->
        <div class="footer-bottom">
            <div class="container">
                © 2025 Stock White. All rights reserved.
            </div>
        </div>
    </footer>
  `;

  document.getElementById("footer").innerHTML = footerHTML;
}

window.addEventListener("DOMContentLoaded", loadFooter);

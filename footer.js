function loadFooter() {
  const footerHTML = `
    <!-- FOOTER -->
    <footer class="footer">
        <div class="container footer-inner">

            <!-- Logo + short text -->
            <div class="footer-col">
                <div class="logo footer-logo">StockWhite</div>
                <p>Timeless minimal fashion<br>your style starts here</p>
            </div>

            <!-- Social icons -->
            <div class="footer-col footer-social">
                <a href="https://www.instagram.com/stock.white_?igsh=MW9xbXpmYXI3cThw" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="#" aria-label="Tiktok"><i class="fa-brands fa-tiktok"></i></a>
                <a href="https://www.facebook.com/share/16gnycESg5/?mibextid=wwXIfr" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            </div>

            <!-- Contact info -->
            <div class="footer-col footer-contact">
                <p><i class="fas fa-phone-alt"></i><a href="tel:+201115599997">0111 559 9997</a></p>
                <p><i class="fa-solid fa-location-dot"></i><a href="https://maps.app.goo.gl/MGwTy6qZLG5f9Vpj9">STOCKWHITE</a></p>
            </div>

        </div>

        <!-- Copyright -->
        <div class="footer-bottom">
            <div class="container">
                © 2025 StockWhite. All rights reserved.
            </div>
        </div>
    </footer>
  `;

  document.getElementById("footer").innerHTML = footerHTML;
}

window.addEventListener("DOMContentLoaded", loadFooter);

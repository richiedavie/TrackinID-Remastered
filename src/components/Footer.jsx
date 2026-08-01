import './Footer.css';

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-col">
            <h3 className="footer-logo">Trackin.ID</h3>
            <p className="footer-desc">
              Advanced fleet management technology for modern logistics.
            </p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter/X</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="footer-col">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:info@trackin.id">info@trackin.id</a></li>
              <li>+62 811 1234 5678</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Trackin.ID. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

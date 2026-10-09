import "./Footer.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="site-footer">

      <div className="footer-cta">
        <div className="footer-cta-inner">
          <div className="footer-cta-text">
            <span>YOUR NEXT JOURNEY STARTS HERE</span>
            <h2>
              READY TO <strong>HIT THE ROAD?</strong>
            </h2>
          </div>

          <button
            className="footer-cta-button"
            onClick={() => navigate("/vehicles")}
          >
            EXPLORE VEHICLES <span>↗</span>
          </button>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-inner">

          <div className="footer-brand">
            <div className="footer-brand-top">
              <div className="footer-logo">
                <img src={logo} alt="Vehicle Rental" />
              </div>

              <div className="footer-brand-name">
                <h2>VEHICLE RENTAL</h2>
                <span>YOUR JOURNEY. YOUR WAY.</span>
              </div>
            </div>

            <p className="footer-description">
              From everyday drives to unforgettable road trips,
              find the right vehicle for every journey. Comfort,
              convenience and freedom, all in one place.
            </p>

            <div className="footer-brand-tag">
              <span></span>
              DRIVE YOUR WAY
            </div>
          </div>

          <div className="footer-contact-section">
            <h3 className="footer-section-title">
              CONTACT US
            </h3>

            <p className="footer-section-description">
              Need assistance with a booking? Get in touch
              with our team.
            </p>

            <div className="footer-contact-list">

              <a
                href="tel:+9779800000000"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">↗</span>
                <div>
                  <span className="footer-contact-label">
                    PHONE
                  </span>
                  <span className="footer-contact-value">
                    +977 9800000000
                  </span>
                </div>
              </a>

              <a
                href="tel:+9779811111111"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">↗</span>
                <div>
                  <span className="footer-contact-label">
                    PHONE
                  </span>
                  <span className="footer-contact-value">
                    +977 9811111111
                  </span>
                </div>
              </a>

              <a
                href="mailto:info@vehiclerental.com"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">✉</span>
                <div>
                  <span className="footer-contact-label">
                    GENERAL INQUIRIES
                  </span>
                  <span className="footer-contact-value">
                    info@vehiclerental.com
                  </span>
                </div>
              </a>

              <a
                href="mailto:support@vehiclerental.com"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">✉</span>
                <div>
                  <span className="footer-contact-label">
                    CUSTOMER SUPPORT
                  </span>
                  <span className="footer-contact-value">
                    support@vehiclerental.com
                  </span>
                </div>
              </a>

            </div>
          </div>

          <div className="footer-social">
            <h3 className="footer-section-title">
              STAY CONNECTED
            </h3>

            <p className="footer-section-description">
              Follow us for vehicle updates, travel inspiration
              and the latest from Vehicle Rental.
            </p>

            <div className="social-links">

              <a href="#" aria-label="Instagram">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/instagram.svg"
                  alt="Instagram"
                />
              </a>

              <a href="#" aria-label="Facebook">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/facebook.svg"
                  alt="Facebook"
                />
              </a>

              <a href="#" aria-label="YouTube">
                <img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v16/icons/youtube.svg"
                  alt="YouTube"
                />
              </a>

            </div>

            <div className="footer-social-note">
              <span className="footer-status-dot"></span>
              MADE FOR EVERY JOURNEY
            </div>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">

          <p>
            © {new Date().getFullYear()} Vehicle Rental Services.
            All rights reserved.
          </p>

          <div className="footer-bottom-right">
            <span>COMFORT</span>
            <span className="footer-bottom-divider"></span>
            <span>FREEDOM</span>
            <span className="footer-bottom-divider"></span>
            <span>YOUR WAY</span>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;

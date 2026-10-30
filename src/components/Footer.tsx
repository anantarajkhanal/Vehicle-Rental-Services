import "./Footer.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.19 18a19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.09 3.18 2 2 0 0 1 4.08 1h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.06 8.94a16 16 0 0 0 6 6l1.31-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 7L2 7" />
    </svg>
  );
}

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
            <h3 className="footer-section-title">CONTACT US</h3>

            <p className="footer-section-description">
              Need assistance with a booking? Get in touch
              with our team.
            </p>

            <div className="footer-contact-list">
              <a
                href="tel:+9779800000000"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <PhoneIcon />
                </span>
                <div>
                  <span className="footer-contact-label">PHONE</span>
                  <span className="footer-contact-value">
                    +977 9800000000
                  </span>
                </div>
              </a>

              <a
                href="tel:+9779811111111"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <PhoneIcon />
                </span>
                <div>
                  <span className="footer-contact-label">PHONE</span>
                  <span className="footer-contact-value">
                    +977 9811111111
                  </span>
                </div>
              </a>

              <a
                href="mailto:info@vehiclerental.com"
                className="footer-contact-item"
              >
                <span className="footer-contact-icon">
                  <MailIcon />
                </span>
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
                <span className="footer-contact-icon">
                  <MailIcon />
                </span>
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
            <h3 className="footer-section-title">STAY CONNECTED</h3>

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
    </footer>
  );
}

export default Footer;

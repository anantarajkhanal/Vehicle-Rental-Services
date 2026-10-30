
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../assets/logomain.jpg";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (currentUser) {
      const name =
        currentUser.name ||
        currentUser.fullName ||
        currentUser.email?.split("@")[0] ||
        "";

      setUserName(name.split(" ")[0]);
    }
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="header-brand" aria-label="Vehicle Rental home">
          <span className="header-logo">
            <img src={mainLogo} alt="Vehicle Rental" />
          </span>
          <span>VEHICLE RENTAL</span>
        </Link>

        <div className="header-right">
          <nav className="header-nav" aria-label="Main navigation">
            <Link to="/vehicles">VEHICLES</Link>
            <Link to="/about-us">ABOUT US</Link>

            {userName ? (
              <div className="header-profile">
                <div className="profile-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                  </svg>
                </div>
                <span className="profile-name">{userName}</span>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="header-login"
                  onClick={() => navigate("/login")}
                >
                  LOGIN
                </button>

                <button
                  type="button"
                  className="signup-button"
                  onClick={() => navigate("/signup")}
                >
                  SIGN UP
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;

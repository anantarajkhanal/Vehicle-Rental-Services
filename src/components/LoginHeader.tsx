
import { Link, useNavigate } from "react-router-dom";
import mainLogo from "../assets/logomain.jpg";
import "./LoginHeader.css";

function LoginHeader() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const userName =
    currentUser?.fullName?.split(" ")[0] ||
    currentUser?.name?.split(" ")[0] ||
    currentUser?.email?.split("@")[0] ||
    "User";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/dashboard" className="header-brand">
          <div className="header-logo">
            <img src={mainLogo} alt="Vehicle Rental" />
          </div>
          <span>VEHICLE RENTAL</span>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          <Link to="/vehicles">VEHICLES</Link>
          <Link to="/about-us">ABOUT US</Link>

          <div className="header-profile">
            <div className="profile-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
              </svg>
            </div>
            <span>{userName}</span>
          </div>

          <button
            type="button"
            className="signup-button"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </nav>
      </div>
    </header>
  );
}

export default LoginHeader;

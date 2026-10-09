import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import mainLogo from "../assets/logomain.jpg";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="header-inner">

        <div
          className="header-brand"
          onClick={() => navigate("/")}
        >
          <div className="header-logo">
            <img src={mainLogo} alt="Vehicle Rental" />
          </div>

          <span>VEHICLE RENTAL</span>
        </div>

        <nav className="header-nav">
          <Link to="/vehicles">
            VEHICLES
          </Link>

          <Link to="/about-us">
            ABOUT US
          </Link>

          <button
            className="header-login"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>

          <button
            className="signup-button"
            onClick={() => navigate("/signup")}
          >
            SIGN UP
          </button>
        </nav>

      </div>
    </header>
  );
}

export default Header;
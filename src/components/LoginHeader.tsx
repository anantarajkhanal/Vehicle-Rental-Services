import { useNavigate } from "react-router-dom";
import "./LoginHeader.css";
// import logo from "../assets/logo.png";
import mainLogo from "../assets/logomain.jpg";

function LoginHeader() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  return (
    <header className="site-header">
      <div className="header-inner">

        <div
          className="header-brand"
          onClick={() => navigate("/dashboard")}
        >
          <div className="header-logo">
            <img src={mainLogo} alt="Vehicle Rental" />
          </div>

          <span>VEHICLE RENTAL</span>
        </div>

        <nav className="header-nav">
          <a href="#">VEHICLES</a>
          <a href="#">ABOUT US</a>

          <span className="header-user">
            Hello, <br /> {currentUser?.fullName || "User"}
          </span>

          <button
            className="signup-button"
            onClick={() => {
              localStorage.removeItem("currentUser");
              navigate("/login");
            }}
          >
            LOGOUT
          </button>
        </nav>

      </div>
    </header>
  );
}

export default LoginHeader;

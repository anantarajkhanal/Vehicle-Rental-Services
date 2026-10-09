import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import mainLogo from "../assets/logomain.jpg";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Users from localStorage:", users);

    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    const user = users.find(
      (user: { email: string; password: string }) =>
        user.email === email
    );

    if (!user) {
      newErrors.email = "Email not found";
      isValid = false;
    } else if (user.password !== password) {
      newErrors.password = "Incorrect password";
      isValid = false;
    } else {
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Login successful");
      navigate("/dashboard");
    }

    setErrors(newErrors);
  };

  return (
    <>
      <main className="login-page">
        <Header />

        <div className="login-content">
          <section className="login-info">

            <div className="login-logo-box">
              <img
                src={mainLogo}
                alt="Vehicle Rental"
                className="login-logo"
              />
            </div>

            <div className="login-info-content">
              <h2>
                Welcome <strong>Back</strong>
                <br />
                to <strong>Vehicle Rental</strong>
              </h2>

              <p>
                Sign in to your Rental account to book vehicles, manage your
                bookings, and continue your journey.
              </p>
            </div>

          </section>

          <section className="login-form-section">
            <div className="login-form-container">

              <div className="login-heading">
                <h1>Welcome back</h1>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>

                <div className="login-field">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        email: "",
                      }));
                    }}
                  />

                  {errors.email && (
                    <span className="login-error">
                      {errors.email}
                    </span>
                  )}
                </div>

                <div className="login-field">
                  <label>Password</label>

                  <div className="login-password-wrapper">

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="8 characters long"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          password: "",
                        }));
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "HIDE" : "SHOW"}
                    </button>

                  </div>

                  {errors.password && (
                    <span className="login-error">
                      {errors.password}
                    </span>
                  )}
                </div>

                <button className="login-submit" type="submit">
                  CONTINUE
                </button>

              </form>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Login;

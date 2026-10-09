
import { useState } from "react";

import "./Signup.css";

import Header from "../components/Header";

import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

import mainLogo from "../assets/logomain.jpg";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let isValid = true;

    if (!fullName.trim()) {

      newErrors.fullName = "Full name is required";

      isValid = false;

    }

    if (!email.trim()) {

      newErrors.email = "Email is required";

      isValid = false;

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

      newErrors.email = "Enter a valid email address";

      isValid = false;

    }

    if (!password) {

      newErrors.password = "Password is required";

      isValid = false;

    } else if (password.length < 8) {

      newErrors.password = "Password must be at least 8 characters";

      isValid = false;

    }

    if (!confirmPassword) {

      newErrors.confirmPassword = "Please confirm your password";

      isValid = false;

    } else if (password !== confirmPassword) {

      newErrors.confirmPassword = "Passwords do not match";

      isValid = false;

    }

    setErrors(newErrors);

    if (isValid) {

      const newUser = {
        fullName,
        email,
        password,
      };

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      localStorage.setItem("currentUser", JSON.stringify(newUser));

      navigate("/govid");

    }

  };

  return (

    <>

      <main className="signup-page">

        <Header />

        <div className="signup-content">

          <section className="signup-info">

            <div className="signup-logo-box">

              <img
                src={mainLogo}
                alt="Vehicle Rental"
                className="signup-logo"
              />

            </div>

            <div className="signup-info-content">

              <h2>

                Join <strong>Vehicle Rental</strong>

                <br />

                <strong>Service</strong>

              </h2>

              <p>

                Create your Rental account in under a minute.

                Book rides, list vehicles, and manage everything

                from one secure dashboard.

              </p>

            </div>

          </section>

          <section className="signup-form-section">

            <div className="signup-form-container">

              <div className="signup-heading">

                <h1>Create your account</h1>

              </div>

              <form className="signup-form" onSubmit={handleSubmit}>

                <div className="signup-field">

                  <label>Full name</label>

                  <input
                    type="text"
                    placeholder="Ram Thakuri"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      setErrors((prev) => ({
                        ...prev,
                        fullName: "",
                      }));
                    }}
                  />

                  {errors.fullName && (
                    <span className="signup-error">
                      {errors.fullName}
                    </span>
                  )}

                </div>

                <div className="signup-field">

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
                    <span className="signup-error">
                      {errors.email}
                    </span>
                  )}

                </div>

                <div className="signup-field">

                  <label>Password</label>

                  <div className="password-wrapper">

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
                    <span className="signup-error">
                      {errors.password}
                    </span>
                  )}

                </div>

                <div className="signup-field">

                  <label>Confirm Password</label>

                  <div className="password-wrapper">

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="8 characters long"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          confirmPassword: "",
                        }));
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "HIDE" : "SHOW"}
                    </button>

                  </div>

                  {errors.confirmPassword && (
                    <span className="signup-error">
                      {errors.confirmPassword}
                    </span>
                  )}

                </div>

                <button className="signup-submit" type="submit">
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

export default Signup;

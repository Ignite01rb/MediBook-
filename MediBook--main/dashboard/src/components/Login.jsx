import React, { useContext, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match!");
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, confirmPassword, role: "Admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.message === "Network Error" || !error.response) {
        console.warn("Backend down. Falling back to Mock Login mode.");
        const registeredAdmins = JSON.parse(localStorage.getItem("mock_registered_admins") || "[]");
        const matchedAdmin = registeredAdmins.find(u => u.email === email && u.password === password);

        if (matchedAdmin || (email === "admin@example.com" && password === "adminpassword")) {
          const adminObj = matchedAdmin || {
            firstName: "Default",
            lastName: "Admin",
            email: email,
            phone: "9876543210",
            nic: "11111",
            dob: "1985-01-01",
            gender: "Male",
          };
          localStorage.setItem("mock_admin_user", JSON.stringify(adminObj));
          toast.success("Logged in successfully (Mock Mode)!");
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        } else {
          toast.error("Invalid email or password (Mock Mode)!");
        }
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="auth-page">
      {/* Animated background elements */}
      <div className="auth-bg-shapes">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
        <div className="auth-shape auth-shape-3"></div>
        <div className="auth-shape auth-shape-4"></div>
      </div>

      <div className="auth-container">
        {/* Left Panel - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-logo-section">
              <div className="auth-logo-icon">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect width="48" height="48" rx="12" fill="rgba(255,255,255,0.2)"/>
                  <path d="M24 8L24 40M8 24L40 24" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <circle cx="24" cy="24" r="8" stroke="white" strokeWidth="2.5" fill="none"/>
                </svg>
              </div>
              <h1 className="auth-brand-name">MediBook</h1>
            </div>
            <h2 className="auth-brand-tagline">Admin Dashboard</h2>
            <p className="auth-brand-desc">
              Manage appointments, doctors, and hospital operations from a single, powerful dashboard.
            </p>
            <div className="auth-brand-features">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Real-time appointment tracking</span>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Doctor & staff management</span>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Secure admin controls</span>
              </div>
            </div>
          </div>
          <div className="auth-branding-footer">
            <p>© 2026 MediBook. All rights reserved.</p>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Welcome back</h2>
              <p>Sign in to your admin account</p>
            </div>

            <form onSubmit={handleLogin} className="auth-form">
              <div className="auth-input-group">
                <label htmlFor="login-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.333 3.333h13.334c.916 0 1.666.75 1.666 1.667v10c0 .917-.75 1.667-1.666 1.667H3.333c-.916 0-1.666-.75-1.666-1.667V5c0-.917.75-1.667 1.666-1.667z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.333 5L10 11.667 1.667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="admin@medibook.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="login-password">Password</label>
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3.333" y="9.167" width="13.333" height="9.167" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.833 9.167V5.833a4.167 4.167 0 018.334 0v3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M11.767 11.767a2.5 2.5 0 11-3.534-3.534" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.95 14.95A8.393 8.393 0 0110 16.667C4.167 16.667.833 10 .833 10a15.358 15.358 0 014.217-4.95m3.2-1.558A7.608 7.608 0 0110 3.333c5.833 0 9.167 6.667 9.167 6.667a15.392 15.392 0 01-1.8 2.567M.833.833l18.334 18.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M.833 10s3.334-6.667 9.167-6.667c5.833 0 9.167 6.667 9.167 6.667s-3.334 6.667-9.167 6.667C4.167 16.667.833 10 .833 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="login-confirm-password">Confirm Password</label>
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3.333" y="9.167" width="13.333" height="9.167" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.833 9.167V5.833a4.167 4.167 0 018.334 0v3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    id="login-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M11.767 11.767a2.5 2.5 0 11-3.534-3.534" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14.95 14.95A8.393 8.393 0 0110 16.667C4.167 16.667.833 10 .833 10a15.358 15.358 0 014.217-4.95m3.2-1.558A7.608 7.608 0 0110 3.333c5.833 0 9.167 6.667 9.167 6.667a15.392 15.392 0 01-1.8 2.567M.833.833l18.334 18.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M.833 10s3.334-6.667 9.167-6.667c5.833 0 9.167 6.667 9.167 6.667s-3.334 6.667-9.167 6.667C4.167 16.667.833 10 .833 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
                id="login-submit"
              >
                {isLoading ? (
                  <span className="auth-spinner"></span>
                ) : (
                  <>
                    Sign In
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4.167 10h11.666M10.833 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="auth-form-footer">
              <p>
                Don't have an admin account?{" "}
                <Link to="/register" className="auth-link">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

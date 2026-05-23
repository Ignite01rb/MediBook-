import React, { useContext, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/admin/addnew",
        {
          firstName,
          lastName,
          email,
          phone,
          dob,
          gender,
          password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
    } catch (error) {
      if (error.message === "Network Error" || !error.response) {
        console.warn("Backend down. Falling back to Mock Registration mode.");
        const registeredAdmins = JSON.parse(localStorage.getItem("mock_registered_admins") || "[]");
        const adminExists = registeredAdmins.some(u => u.email === email);
        if (adminExists) {
          toast.error("Admin user already exists!");
          return;
        }

        const newAdminObj = { firstName, lastName, email, phone, dob, gender, password };
        registeredAdmins.push(newAdminObj);
        localStorage.setItem("mock_registered_admins", JSON.stringify(registeredAdmins));
        localStorage.setItem("mock_admin_user", JSON.stringify(newAdminObj));

        toast.success("Admin registered successfully (Mock Mode)!");
        setIsAuthenticated(true);
        navigateTo("/");
      } else {
        toast.error(error.response?.data?.message || "Registration failed!");
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
            <h2 className="auth-brand-tagline">Join Admin Team</h2>
            <p className="auth-brand-desc">
              Create your administrator account to start managing the hospital's digital operations.
            </p>
            <div className="auth-brand-features">
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Full administrative access</span>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Manage doctors & appointments</span>
              </div>
              <div className="auth-feature-item">
                <div className="auth-feature-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Secure role-based controls</span>
              </div>
            </div>
          </div>
          <div className="auth-branding-footer">
            <p>© 2026 MediBook. All rights reserved.</p>
          </div>
        </div>

        {/* Right Panel - Register Form */}
        <div className="auth-form-panel">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>Create Account</h2>
              <p>Register as a new administrator</p>
            </div>

            <form onSubmit={handleRegister} className="auth-form">
              <div className="auth-input-row">
                <div className="auth-input-group">
                  <label htmlFor="reg-firstname">First Name</label>
                  <div className="auth-input-wrapper">
                    <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.667 17.5v-1.667A3.333 3.333 0 0013.333 12.5H6.667a3.333 3.333 0 00-3.334 3.333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="6.667" r="3.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      id="reg-firstname"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label htmlFor="reg-lastname">Last Name</label>
                  <div className="auth-input-wrapper">
                    <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.667 17.5v-1.667A3.333 3.333 0 0013.333 12.5H6.667a3.333 3.333 0 00-3.334 3.333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="10" cy="6.667" r="3.333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      id="reg-lastname"
                      type="text"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="reg-email">Email Address</label>
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.333 3.333h13.334c.916 0 1.666.75 1.666 1.667v10c0 .917-.75 1.667-1.666 1.667H3.333c-.916 0-1.666-.75-1.666-1.667V5c0-.917.75-1.667 1.666-1.667z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.333 5L10 11.667 1.667 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="admin@medibook.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-input-row">
                <div className="auth-input-group">
                  <label htmlFor="reg-phone">Phone Number</label>
                  <div className="auth-input-wrapper">
                    <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M18.333 14.1v2.5a1.667 1.667 0 01-1.816 1.667 16.5 16.5 0 01-7.192-2.559 16.25 16.25 0 01-5-5 16.5 16.5 0 01-2.558-7.225A1.667 1.667 0 013.433 1.667h2.5A1.667 1.667 0 017.6 3.1c.106.8.303 1.586.583 2.342a1.667 1.667 0 01-.375 1.758L6.692 8.317a13.333 13.333 0 005 5l1.116-1.117a1.667 1.667 0 011.759-.375c.756.28 1.542.477 2.341.583a1.667 1.667 0 011.425 1.692z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      id="reg-phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="auth-input-group">
                  <label htmlFor="reg-dob">Date of Birth</label>
                  <div className="auth-input-wrapper">
                    <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2.5" y="3.333" width="15" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M13.333 1.667v3.333M6.667 1.667v3.333M2.5 8.333h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <input
                      id="reg-dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="reg-gender">Gender</label>
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="8.333" r="4.167" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 12.5v5.833M7.5 15.833h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <select
                    id="reg-gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="auth-input-group">
                <label htmlFor="reg-password">Password</label>
                <div className="auth-input-wrapper">
                  <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3.333" y="9.167" width="13.333" height="9.167" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.833 9.167V5.833a4.167 4.167 0 018.334 0v3.334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <input
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
                id="register-submit"
              >
                {isLoading ? (
                  <span className="auth-spinner"></span>
                ) : (
                  <>
                    Create Account
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M4.167 10h11.666M10.833 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="auth-form-footer">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

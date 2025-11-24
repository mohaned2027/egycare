// Header Component - React-Bootstrap Version
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  getCurrentUser,
  logout,
} from "../services/authService";
import styles from "../styles/Header.module.css";
import { Dropdown } from "react-bootstrap";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();

  useEffect(() => {
    fetch("/data/settings.json")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error loading settings:", err));
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div
            style={{
              width: "40px",
              height: "40px",
              background: `linear-gradient(135deg, ${
                settings?.logo?.primaryColor || "#0B5FA5"
              } 0%, ${settings?.logo?.secondaryColor || "#0E74C7"} 100%)`,
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "10px",
              overflow:"hidden"
            }}
          >
            <i
              className={`bi ${
                settings?.logo?.iconClass || "bi-heart-pulse-fill"
              }`}
              style={{ color: "white", fontSize: "1.25rem" }}
            ></i>
          </div>

          <div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                color: settings?.logo?.primaryColor || "#0B5FA5",
              }}
            >
              {settings?.siteName || "EgyCare"}
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "#6B7280",
                marginTop: "-5px",
              }}
            >
              {settings?.siteSlogan || "Healthcare Platform"}
            </div>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav */}
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname.includes("/specialties") ? "active" : ""
                }`}
                to="/specialties"
              >
                Medical Specialties
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* User Section */}
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="link"
                  className={`d-flex align-items-center p-0 ${styles.noArrow}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {/* Profile Image */}
                  <img
                    src={currentUser?.profileImage || "/placeholder.svg"}
                    alt={currentUser?.name}
                    className="rounded-circle"
                    style={{
                      width: "38px",
                      height: "38px",
                      objectFit: "cover",
                      border: "2px solid #0B5FA5",
                    }}
                  />

                  {/* Name - Always visible */}
                  <span
                    className="fw-semibold mx-2"
                    style={{
                      color: "#1F2937",
                      fontSize: "0.95rem",
                    }}
                  >
                    {currentUser?.name}
                  </span>

                  {/* Arrow Icon */}
               
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/dashboard">
                    <i className="bi bi-speedometer2 fs-5 me-2" style={{ color: "#0B5FA5" }}></i>
                    Dashboard
                  </Dropdown.Item>

                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person-circle fs-5 me-2" style={{ color: "#0B5FA5" }}></i>
                    Profile
                  </Dropdown.Item>

                  <Dropdown.Divider />

                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right fs-5 me-2" style={{ color: "#0B5FA5" }}></i>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Link
                  to="/specialties"
                  className="btn btn-primary btn-sm d-none d-lg-inline-flex me-2"
                >
                  Book Now
                </Link>
                <Link to="/login" className="btn btn-outline-primary btn-sm">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
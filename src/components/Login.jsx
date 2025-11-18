// Login Page - Login page
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { login, isAuthenticated } from '../services/authService';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate data
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Attempt login
    const result = await login(email, password);

    if (result.success) {
      // If login successful
      // Redirect to dashboard
      navigate('/dashboard', { replace: true });
    } else {
      // If login failed
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <section className="py-5 flex-grow-1 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-lg-9">
              <div className="card shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <div className="row g-0">
                  {/* Left Side - Branding */}
                  <div className="col-lg-5 d-none d-lg-block" style={{ background: 'linear-gradient(135deg, #0B5FA5 0%, #0E74C7 100%)' }}>
                    <div className="p-5 text-white h-100 d-flex flex-column justify-content-center">
                      <div className="mb-4">
                        <div className="mb-3" style={{ fontSize: '3rem' }}>
                          <i className="bi bi-heart-pulse-fill"></i>
                        </div>
                        <h2 className="fw-bold mb-3">Welcome Back!</h2>
                        <p className="mb-4" style={{ opacity: 0.9 }}>
                          Access your medical dashboard and manage your appointments with ease.
                        </p>
                      </div>
                      <div className="mt-auto">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.2rem' }}></i>
                          <span>Secure & Private</span>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.2rem' }}></i>
                          <span>24/7 Access</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-check-circle-fill me-2" style={{ fontSize: '1.2rem' }}></i>
                          <span>Expert Doctors</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Login Form */}
                  <div className="col-lg-7">
                    <div className="p-5">
                      <div className="text-center mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #0B5FA5 0%, #0E74C7 100%)' }}>
                          <i className="bi bi-person-circle" style={{ fontSize: '2rem', color: 'white' }}></i>
                        </div>
                        <h3 className="fw-bold mb-2">Sign In to EgyCare</h3>
                        <p className="text-muted">Enter your credentials to continue</p>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <div className="alert alert-danger border-0" role="alert" style={{ borderRadius: '12px' }}>
                          <i className="bi bi-exclamation-circle me-2"></i>
                          {error}
                        </div>
                      )}

                      {/* Login Form */}
                      <form onSubmit={handleLogin}>
                        <div className="mb-4">
                          <label className="form-label fw-semibold">Email Address</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '12px 0 0 12px' }}>
                              <i className="bi bi-envelope text-muted"></i>
                            </span>
                            <input
                              type="email"
                              className="form-control border-start-0 ps-0"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="example@email.com"
                              disabled={loading}
                              style={{ borderRadius: '0 12px 12px 0' }}
                            />
                          </div>
                        </div>

                        <div className="mb-4">
                          <label className="form-label fw-semibold">Password</label>
                          <div className="input-group input-group-lg">
                            <span className="input-group-text bg-light border-end-0" style={{ borderRadius: '12px 0 0 12px' }}>
                              <i className="bi bi-lock text-muted"></i>
                            </span>
                            <input
                              type="password"
                              className="form-control border-start-0 ps-0"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              disabled={loading}
                              style={{ borderRadius: '0 12px 12px 0' }}
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100 mb-4"
                          disabled={loading}
                          style={{ borderRadius: '12px', padding: '0.875rem', fontSize: '1rem', fontWeight: '600' }}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2"></span>
                              Signing In...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-box-arrow-in-right me-2"></i>
                              Sign In
                            </>
                          )}
                        </button>
                      </form>

                      {/* Demo Information */}
                      <div className="alert alert-info border-0 mb-4" style={{ borderRadius: '12px', background: '#e3f2fd' }}>
                        <div className="d-flex align-items-start">
                          <i className="bi bi-info-circle-fill me-2 mt-1" style={{ color: '#0288d1' }}></i>
                          <div>
                            <strong style={{ color: '#01579b' }}>Demo Credentials</strong>
                            <div className="mt-1" style={{ fontSize: '0.9rem', color: '#01579b' }}>
                              Email: <strong>ahmed@example.com</strong><br />
                              Password: <strong>123456</strong>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <Link to="/" className="text-decoration-none d-inline-flex align-items-center" style={{ color: '#0B5FA5', fontWeight: '500' }}>
                          <i className="bi bi-arrow-left me-2"></i>
                          Back to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

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
    <div>
      <Header />

      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
              <div className="card shadow">
                <div className="card-body p-4">
                  <h2 className="text-center mb-4">
                    <i className="bi bi-person-circle me-2"></i>
                    Login
                  </h2>

                  {/* Error Message */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  {/* Login Form */}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        disabled={loading}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Logging in...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Login
                        </>
                      )}
                    </button>
                  </form>

                  {/* Demo Information */}
                  <div className="alert alert-info mt-3 mb-0">
                    <small>
                      <strong>For demo:</strong><br />
                      Email: ahmed@example.com<br />
                      Password: 123456
                    </small>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none">
                      <i className="bi bi-arrow-left me-1"></i>
                      Back to Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;

// Login Page - صفحة تسجيل الدخول
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
  
  // إذا كان المستخدم مسجل دخول بالفعل، انتقل للصفحة الرئيسية
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);
  
  // دالة تسجيل الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // التحقق من البيانات
    if (!email || !password) {
      setError('برجاء ملء جميع الحقول');
      setLoading(false);
      return;
    }
    
    // محاولة تسجيل الدخول
    const result = await login(email, password);
    
    if (result.success) {
      // إذا نجح تسجيل الدخول
      // الانتقال للصفحة المطلوبة أو الصفحة الرئيسية
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } else {
      // إذا فشل تسجيل الدخول
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
                    تسجيل الدخول
                  </h2>
                  
                  {/* رسالة الخطأ */}
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      <i className="bi bi-exclamation-circle me-2"></i>
                      {error}
                    </div>
                  )}
                  
                  {/* نموذج تسجيل الدخول */}
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label">البريد الإلكتروني</label>
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
                      <label className="form-label">كلمة المرور</label>
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
                          جاري تسجيل الدخول...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          تسجيل الدخول
                        </>
                      )}
                    </button>
                  </form>
                  
                  {/* معلومات تجريبية */}
                  <div className="alert alert-info mt-3 mb-0">
                    <small>
                      <strong>للتجربة:</strong><br />
                      البريد: ahmed@example.com<br />
                      كلمة المرور: 123456
                    </small>
                  </div>
                  
                  <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none">
                      <i className="bi bi-arrow-right me-1"></i>
                      العودة للصفحة الرئيسية
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

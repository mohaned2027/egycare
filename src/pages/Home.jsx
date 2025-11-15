// Home Page - الصفحة الرئيسية
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  // State لحفظ التخصصات
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  // جلب التخصصات من JSON API عند تحميل الصفحة
  useEffect(() => {
    // استخدام fetch لجلب البيانات
    fetch('/data/specialties.json')
      .then(response => response.json())
      .then(data => {
        // حفظ البيانات في state
        setSpecialties(data.slice(0, 6)); // أول 6 تخصصات فقط
        setLoading(false);
      })
      .catch(error => {
        console.error('خطأ في جلب التخصصات:', error);
        setLoading(false);
      });
  }, []); // [] معناها run one time فقط

  // أيقونات التخصصات
  const getSpecialtyIcon = (icon) => {
    const icons = {
      heart: 'bi-heart-pulse',
      droplet: 'bi-droplet',
      baby: 'bi-emoji-smile',
      bone: 'bi-award',
      brain: 'bi-lightning',
      eye: 'bi-eye'
    };
    return icons[icon] || 'bi-hospital';
  };

  return (
    <div>
      <Header />
      
      {/* Hero Section - القسم الرئيسي */}
      <section className="hero-section">
        <div className="container">
          <h1>مرحباً بك في EgyCare</h1>
          <p>احجز موعدك مع أفضل الأطباء في مصر بكل سهولة</p>
          <Link to="/specialties" className="btn btn-light btn-lg">
            احجز الآن
            <i className="bi bi-arrow-left me-2"></i>
          </Link>
        </div>
      </section>

      {/* Medical Specialties Section - قسم التخصصات الطبية */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">التخصصات الطبية</h2>
          
          {/* Loading Spinner */}
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {/* عرض كل تخصص في card */}
              {specialties.map(specialty => (
                <div key={specialty.id} className="col-md-4 col-lg-4">
                  <Link 
                    to={`/specialty/${specialty.id}`} 
                    className="text-decoration-none"
                  >
                    <div className="card specialty-card">
                      <div className="card-body">
                        <i className={`bi ${getSpecialtyIcon(specialty.icon)} specialty-icon`}></i>
                        <h5 className="card-title">{specialty.nameAr}</h5>
                        <p className="card-text text-muted">{specialty.descriptionAr}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* زر عرض كل التخصصات */}
          <div className="text-center mt-5">
            <Link to="/specialties" className="btn btn-primary">
              عرض جميع التخصصات
              <i className="bi bi-arrow-left me-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - قسم المميزات */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">لماذا EgyCare؟</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <i className="bi bi-calendar-check fs-1 text-primary mb-3"></i>
                <h4>حجز سريع وسهل</h4>
                <p className="text-muted">
                  احجز موعدك في دقائق معدودة
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <i className="bi bi-star-fill fs-1 text-primary mb-3"></i>
                <h4>أفضل الأطباء</h4>
                <p className="text-muted">
                  أطباء متخصصون ذوو خبرة عالية
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <i className="bi bi-shield-check fs-1 text-primary mb-3"></i>
                <h4>آمن وموثوق</h4>
                <p className="text-muted">
                  بياناتك في أمان تام
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

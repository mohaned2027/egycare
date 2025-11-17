import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/data/specialties.json').then(res => res.json()),
      fetch('/data/doctors.json').then(res => res.json())
    ])
      .then(([specialtiesData, doctorsData]) => {
        setSpecialties(specialtiesData.slice(0, 6)); // أول 6 تخصصات
        setDoctors(doctorsData);
        setLoading(false);
      })
      .catch(error => {
        console.error('خطأ في جلب البيانات:', error);
        setLoading(false);
      });
  }, []);

  const getDoctorCount = (specialtyId) => {
    return doctors.filter(doc => doc.specialtyId === specialtyId).length;
  };

  const getSpecialtyIcon = (icon) => {
    const icons = {
      heart: { icon: 'bi-heart-pulse', color: 'icon-red' },
      droplet: { icon: 'bi-droplet', color: 'icon-blue' },
      baby: { icon: 'bi-emoji-smile', color: 'icon-yellow' },
      bone: { icon: 'bi-award', color: 'icon-orange' },
      brain: { icon: 'bi-lightning', color: 'icon-purple' },
      eye: { icon: 'bi-eye', color: 'icon-green' }
    };
    return icons[icon] || { icon: 'bi-hospital', color: 'icon-blue' };
  };


  return (
    <div>
      <Header />

      {/* Hero Section - New Professional Design */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-lg-start text-center">
              <h1 className="mb-4">
                Advanced and Safe <br/>
                <span style={{ color: '#00D4FF' }}>Healthcare</span>
              </h1>
              <p className="mb-4">
                احجز المواعيد الطبية وإدارة التاريخ الطبي الخاص بك بسرعة وأمان وكفاءة مع أفضل الأطباء المعتمدين في مصر
              </p>
              <div className="d-flex gap-3 justify-content-lg-start justify-content-center">
                <Link to="/specialties" className="btn btn-light btn-lg">
                  احجز موعدك الآن
                </Link>
                <Link to="/dashboard" className="btn btn-outline-primary btn-lg" style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderColor: 'white', color: 'white' }}>
                  لوحة التحكم
                </Link>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              {/* Quick Search Card */}
              <div className="quick-search-card">
                <h3>بحث سريع</h3>
                <form>
                  <div className="mb-3">
                    <label className="form-label text-end w-100">اختر التخصص</label>
                    <select className="form-select">
                      <option value="">اختر التخصص</option>
                      <option value="1">القلب والأوعية الدموية</option>
                      <option value="2">الجلدية</option>
                      <option value="3">طب الأطفال</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-end w-100">اسم الطبيب (اختياري)</label>
                    <input type="text" className="form-control" placeholder="ابحث عن طبيب محدد" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-end w-100">اختر المحافظة</label>
                    <select className="form-select">
                      <option value="">اختر المحافظة</option>
                      <option value="cairo">القاهرة</option>
                      <option value="giza">الجيزة</option>
                      <option value="alex">الإسكندرية</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-end w-100">اختر التاريخ</label>
                    <input type="date" className="form-control" />
                  </div>
                  <Link to="/specialties" className="btn btn-primary w-100">
                    <i className="bi bi-search me-2"></i>
                    ابحث عن طبيب
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why EgyCare Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title">لماذا EgyCare؟</h2>
          <p className="section-subtitle">
            نقدم لك تجربة طبية شاملة باستخدام أحدث التقنيات وأعلى معايير الجودة
          </p>

          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-clock"></i>
                </div>
                <h4>متاح 24/7</h4>
                <p>خدمة متاحة على مدار الساعة لراحتك</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <h4>حجز سريع وسهل</h4>
                <p>احجز موعدك في خطوات بسيطة</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <h4>تاريخ طبي آمن</h4>
                <p>إدارة آمنة للسجلات والتاريخ الطبي</p>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="bi bi-patch-check"></i>
                </div>
                <h4>أطباء معتمدون</h4>
                <p>شبكة من أفضل الأطباء المؤهلين</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Specialties Section */}
      <section className="py-5 bg-light-egycare">
        <div className="container">
          <h2 className="section-title">التخصصات الطبية</h2>
          <p className="section-subtitle">احجز مع أفضل الأطباء في جميع التخصصات</p>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
            </div>
          ) : (
<div className="row g-4">
              {specialties.map(specialty => {
                const iconInfo = getSpecialtyIcon(specialty.icon);
                const doctorCount = getDoctorCount(specialty.id);

                return (
                  <div key={specialty.id} className="col-md-4 col-lg-2 col-6">
                    <Link to={`/specialty/${specialty.id}`} className="specialty-card">
                      
                      <div className={`specialty-card-icon ${iconInfo.color}`}>
                        <i className={`bi ${iconInfo.icon}`}></i>
                      </div>
                      
                      <h5>{specialty.nameAr}</h5>
                      <p className="small mb-0">{specialty.descriptionAr}</p>

                      <span className="badge bg-light text-dark mt-2">
                        {doctorCount} طبيب
                      </span>

                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-5">
            <Link to="/specialties" className="btn btn-outline-primary btn-lg">
              عرض جميع التخصصات
            </Link>
          </div>
        </div>
      </section>

      {/* Patient Reviews Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="section-title">آراء مرضانا</h2>
          <p className="section-subtitle">ماذا يقول مرضانا عن تجربتهم معنا</p>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-clean">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/placeholder.svg"
                    alt="Patient"
                    className="rounded-circle me-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">محمد علي</h6>
                    <small className="text-muted">الجيزة</small>
                  </div>
                </div>
                <div className="mb-3">
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </div>
                <p className="text-muted mb-0">
                  منصة ممتازة استخدمتها! الأطباء مؤهلون والخدمة احترافية
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-clean">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/placeholder.svg"
                    alt="Patient"
                    className="rounded-circle me-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">أحمد محمد</h6>
                    <small className="text-muted">القاهرة</small>
                  </div>
                </div>
                <div className="mb-3">
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star text-warning"></i>
                </div>
                <p className="text-muted mb-0">
                  كانت تجربتي استثنائية مع المنصة. تمكنت من الحجز مع طبيب قلب خلال دقائق
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card-clean">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src="/placeholder.svg"
                    alt="Patient"
                    className="rounded-circle me-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">فاطمة أحمد</h6>
                    <small className="text-muted">الإسكندرية</small>
                  </div>
                </div>
                <div className="mb-3">
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                  <i className="bi bi-star-fill text-warning"></i>
                </div>
                <p className="text-muted mb-0">
                  الخدمة ممتازة والدعم سريع الاستجابة. التاريخ الطبي منظم بشكل مثالي
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light-egycare">
        <div className="container text-center">
          <h2 className="section-title">ابدأ رحلتك الصحية اليوم</h2>
          <p className="section-subtitle">
            انضم لآلاف المرضى الذين يثقون في EgyCare لرعايتهم الصحية
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link to="/specialties" className="btn btn-primary btn-lg">
              احجز موعدك الأول
            </Link>
            <Link to="/contact" className="btn btn-outline-primary btn-lg">
              ابحث عن رعاية طارئة
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

// About Page - صفحة عن EgyCare
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Header />
      
      <section className="hero-section">
        <div className="container">
          <h1>عن EgyCare</h1>
          <p>نربطك بأفضل الأطباء في مصر</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <h2 className="mb-4">من نحن؟</h2>
              <p className="lead">
                EgyCare هي المنصة الطبية الأولى في مصر لحجز المواعيد مع أفضل الأطباء في جميع التخصصات.
              </p>
              <p>
                نسعى لتسهيل الوصول إلى الرعاية الصحية الجيدة من خلال توفير منصة سهلة وآمنة تربط المرضى بالأطباء المتخصصين.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="/placeholder.svg" 
                alt="About EgyCare" 
                className="img-fluid rounded shadow"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-bullseye fs-1 text-primary mb-3"></i>
                  <h4>رؤيتنا</h4>
                  <p className="text-muted">
                    أن نكون المنصة الطبية الأولى في مصر والمنطقة العربية
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-heart fs-1 text-primary mb-3"></i>
                  <h4>مهمتنا</h4>
                  <p className="text-muted">
                    تسهيل الوصول إلى الرعاية الصحية الجيدة للجميع
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-award fs-1 text-primary mb-3"></i>
                  <h4>قيمنا</h4>
                  <p className="text-muted">
                    الجودة، الأمانة، والاحترافية في تقديم الخدمة
                  </p>
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

export default About;

// Contact Page - صفحة التواصل
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // هنا يمكن إضافة كود لإرسال الرسالة
    // في الوقت الحالي سنعرض alert فقط
    alert('شكراً لتواصلك معنا! سنرد عليك قريباً');
    
    // مسح الحقول
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
      <Header />
      
      <section className="hero-section">
        <div className="container">
          <h1>تواصل معنا</h1>
          <p>نحن هنا للإجابة على استفساراتك</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row">
            {/* نموذج التواصل */}
            <div className="col-lg-8 mb-4">
              <div className="card shadow-sm">
                <div className="card-body p-4">
                  <h3 className="mb-4">أرسل لنا رسالة</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <label className="form-label">الاسم *</label>
                        <input 
                          type="text" 
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">البريد الإلكتروني *</label>
                        <input 
                          type="email" 
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">الموضوع *</label>
                      <input 
                        type="text" 
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label">الرسالة *</label>
                      <textarea 
                        className="form-control" 
                        rows="5"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="bi bi-send me-2"></i>
                      إرسال الرسالة
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* معلومات التواصل */}
            <div className="col-lg-4">
              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    <i className="bi bi-telephone me-2"></i>
                    الهاتف
                  </h5>
                  <p className="text-muted">19888</p>
                </div>
              </div>

              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    <i className="bi bi-envelope me-2"></i>
                    البريد الإلكتروني
                  </h5>
                  <p className="text-muted">info@egycare.com</p>
                </div>
              </div>

              <div className="card shadow-sm mb-4">
                <div className="card-body">
                  <h5 className="mb-3">
                    <i className="bi bi-geo-alt me-2"></i>
                    العنوان
                  </h5>
                  <p className="text-muted">القاهرة، مصر</p>
                </div>
              </div>

              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="mb-3">تابعنا</h5>
                  <div className="d-flex gap-3">
                    <a href="#" className="text-primary fs-4">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="text-info fs-4">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="text-danger fs-4">
                      <i className="bi bi-instagram"></i>
                    </a>
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

export default Contact;

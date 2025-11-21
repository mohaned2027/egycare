// About Page - About EgyCare
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    fetch('/data/about.json')
      .then(res => res.json())
      .then(data => setAboutData(data))
      .catch(err => console.error('Error loading about data:', err));
  }, []);

  return (
    <div>
      <Header />

      <section className="hero-section">
        <div className="container">
          <h1>About EgyCare</h1>
          <p>We connect you with the best doctors in Egypt</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6">
              <h2 className="mb-4">{aboutData?.story?.title || 'Who We Are?'}</h2>
              <p className="lead">
                {aboutData?.story?.subtitle || 'EgyCare is Egypt\'s first medical appointment booking platform.'}
              </p>
              <p>
                {aboutData?.story?.description || 'We strive to facilitate access to quality healthcare.'}
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src={aboutData?.Image?.image || "/placeholder.svg"}
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
                  <h4>{aboutData?.vision?.title || 'Our Vision'}</h4>
                  <p className="text-muted">
                    {aboutData?.vision?.description || 'To be Egypt\'s leading medical platform'}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-heart fs-1 text-primary mb-3"></i>
                  <h4>{aboutData?.mission?.title || 'Our Mission'}</h4>
                  <p className="text-muted">
                    {aboutData?.mission?.description || 'Facilitate access to quality healthcare'}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-award fs-1 text-primary mb-3"></i>
                  <h4>{aboutData?.values?.title || 'Our Values'}</h4>
                  <p className="text-muted">
                    {aboutData?.values?.description || 'Quality and professionalism'}
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

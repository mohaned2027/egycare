// About Page - About EgyCare
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
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
              <h2 className="mb-4">Who We Are?</h2>
              <p className="lead">
                EgyCare is Egypt's first medical appointment booking platform. We connect patients with the best specialists in all medical fields.
              </p>
              <p>
                We strive to facilitate access to quality healthcare by providing an easy and secure platform that connects patients with specialized doctors.
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
                  <h4>Our Vision</h4>
                  <p className="text-muted">
                    To be Egypt's and the region's leading medical platform
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-heart fs-1 text-primary mb-3"></i>
                  <h4>Our Mission</h4>
                  <p className="text-muted">
                    Facilitate access to quality healthcare for everyone
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-award fs-1 text-primary mb-3"></i>
                  <h4>Our Values</h4>
                  <p className="text-muted">
                    Quality, honesty, and professionalism in service delivery
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

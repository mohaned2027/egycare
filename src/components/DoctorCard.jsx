import React from "react";

const DoctorCard = ({ doctor, selected, onClick }) => {
  return (
    <div
      className={`doctor-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {/* Selected Badge */}
      {selected && (
        <div className="doctor-card-selected-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}

      {/* Image Header */}
      <div className="doctor-card-image-header">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="doctor-card-image"
        />
      </div>

      {/* Body */}
      <div className="doctor-card-body">
        <h5 className="doctor-card-name">{doctor.name}</h5>
        {doctor.nameAr && (
          <p className="doctor-card-name-ar">{doctor.nameAr}</p>
        )}

        <span className="doctor-card-specialty">{doctor.specialty}</span>

        <div className="doctor-card-rating">
          <div className="doctor-card-stars">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i}
                className={`doctor-card-star ${i < Math.floor(doctor.rating) ? 'filled' : 'empty'}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="doctor-card-rating-number">{doctor.rating}</span>
        </div>

        <p className="doctor-card-experience">
          {doctor.experience} years experience
        </p>

        <hr className="doctor-card-divider" />

        <div className="doctor-card-price-section">
          <span className="doctor-card-price-label">Consultation Fee</span>
          <span className="doctor-card-price-amount">EGP {doctor.price}</span>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
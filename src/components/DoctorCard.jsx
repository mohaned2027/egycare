import React from "react";

const DoctorCard = ({ doctor, selected, onClick }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div
        className={`card doctor-card h-100 ${selected ? "selected" : ""}`}
        onClick={onClick}
      >
        <div className="card-body text-center">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-image mb-3"
          />
          <h5 className="card-title">{doctor.name}</h5>
          <p className="card-text text-muted">{doctor.nameAr}</p>
          <p className="specialty">{doctor.specialty}</p>
          <p className="rating">⭐ {doctor.rating} ({doctor.experience} years exp)</p>
          <p className="price">EGP {doctor.price}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

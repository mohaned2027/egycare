import React from "react";

const SpecialtyCard = ({ specialty, selected, onClick, iconInfo, doctorCount }) => {
  return (
    <div className="col-md-4 col-lg-3 col-12">
      <div
        onClick={onClick}
        className={`specialty-card ${selected ? "selected" : ""}`}
      >
        <div className={`specialty-card-icon ${iconInfo.color}`}>
          <i className={`bi ${iconInfo.icon}`}></i>
        </div>

        <h5>{specialty.name}</h5>
        <p className="text-muted small">{specialty.nameAr}</p>

        <span className="badge bg-light text-dark">
          {doctorCount} Doctors Available
        </span>
      </div>
    </div>
  );
};

export default SpecialtyCard;

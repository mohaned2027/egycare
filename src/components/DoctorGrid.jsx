import React from "react";
import DoctorCard from "./DoctorCard";

const DoctorGrid = ({ doctors, selectedId, onSelect }) => {
  return (
    <div className="row g-4">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          selected={selectedId === doctor.id}
          onClick={() => onSelect(doctor.id)}
        />
      ))}
    </div>
  );
};

export default DoctorGrid;

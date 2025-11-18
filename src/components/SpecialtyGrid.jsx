import React from "react";
import SpecialtyCard from "./SpecialtyCard";

const SpecialtyGrid = ({ specialties, doctors, selectedId, getSpecialtyIcon, onSelect }) => {
  const getDoctorCount = (id) =>
    doctors.filter((doc) => doc.specialtyId === id).length;

  return (
    <div className="row g-4">
      {specialties.map((spec) => {
        const iconInfo = getSpecialtyIcon(spec.icon);
        const doctorCount = getDoctorCount(spec.id);

        return (
          <SpecialtyCard
            key={spec.id}
            specialty={spec}
            iconInfo={iconInfo}
            doctorCount={doctorCount}
            selected={selectedId === spec.id}
            onClick={() => onSelect(spec.id)}
          />
        );
      })}
    </div>
  );
};

export default SpecialtyGrid;

import React from "react";

const SpecialtyProgress = ({ step }) => {
  return (
    <div className="booking-progress d-flex align-items-center justify-content-center gap-3">
      {[1, 2, 3, 4].map(num => (
        <React.Fragment key={num}>
          <div className={`progress-step ${step >= num ? "active" : ""}`}>
            <div className="progress-circle">
              {step > num ? <i className="bi bi-check"></i> : num}
            </div>
            <span className="progress-label d-none d-md-inline">
              {num === 1
                ? "Select specialty"
                : num === 2
                ? "Choose Doctor"
                : num === 3
                ? "Choose Date/Time"
                : "Confirm Booking"}
            </span>
          </div>

          {num < 4 && <div className={`line ${step > num ? "active" : ""}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SpecialtyProgress;

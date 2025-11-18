import React from "react";

const NavigationButtons = ({ disabled, onNext, onPrev }) => {
  return (
    <div className="nav-btns">
      <button className="btn btn-outline-primary" onClick={onPrev}>
        <i className="bi bi-arrow-left me-2"></i> Previous
      </button>

      <button
        className="btn btn-primary px-4"
        disabled={disabled}
        onClick={onNext}
      >
        Next <i className="bi bi-arrow-right ms-2"></i>
      </button>
    </div>
  );
};

export default NavigationButtons;

import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="search-wrapper mb-4">

      <input
        type="text"
        className="form-control search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

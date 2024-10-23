import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onSearch(newValue);
  };

  return (
    <input
      type="text"
      placeholder="Tìm kiếm hàng hóa..."
      value={query}
      onChange={handleChange}
      style={searchBarStyle}
    />
  );
};

const searchBarStyle = {
  marginBottom: "15px",
  padding: "5px",
  width: "300px",
};

export default SearchBar;

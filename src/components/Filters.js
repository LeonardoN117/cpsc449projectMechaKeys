import React from 'react';
import '../styles/KeyboardsPage.css';

const Filters = ({ searchTerm, sortOption, onSearchChange, onSortChange }) => (
  <div className="filters">
    <input 
      type="text" 
      placeholder="Search product..." 
      value={searchTerm}
      onChange={onSearchChange}
    />
    <select value={sortOption} onChange={onSortChange}>
      <option value="name">Sort by Name</option>
      <option value="priceLowToHigh">Price: Low to High</option>
      <option value="priceHighToLow">Price: High to Low</option>
    </select>
  </div>
);

export default Filters;

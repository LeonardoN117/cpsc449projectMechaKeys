//for pushing to GitHub
import React from 'react';
import '../styles/KeyboardsPage.css';

const SwitchCard = ({ Switch, onClick }) => {
  const averageRating =
    Switch.reviews && Switch.reviews.length > 0
      ? (Switch.reviews.reduce((acc, cur) => acc + cur, 0) / Switch.reviews.length).toFixed(1)
      : "No reviews";

  return (
    <div className="Switch-card" onClick={() => onClick(Switch)}>
      <img
        src={Switch.images[Switch.selectedColor]}
        alt={`${Switch.name} - ${Switch.selectedColor}`}
        className="Switch-image" />

      <div className="Switch-details">
        <h2>{Switch.name}</h2>
        <p className="Switch-price">${Switch.price}</p>
        <p className="Switch-color">Color: {Switch.selectedColor}</p>
        <p className="Switch-rating">Rating: {averageRating}⭐</p>
        <p className="Switch-connectivity">Connectivity: {Switch.connectivity}</p>
      </div>
    </div>
  );
};

export default SwitchCard;

import React from 'react';
import '../styles/SwitchesPage.css';

const AccessoryCard = ({ accessory, onClick }) => {
  const averageRating =
    accessory.reviews && accessory.reviews.length > 0
      ? (accessory.reviews.reduce((acc, cur) => acc + cur, 0) / accessory.reviews.length).toFixed(1)
      : "No reviews";

  return (
    <div className="switch-card" onClick={() => onClick(accessory)}>
      <img
        src={accessory.images[accessory.selectedColor]}
        alt={`${accessory.name} - ${accessory.selectedColor}`}
        className="switch-image"
      />

      <div className="switch-details">
        <h2>{accessory.name}</h2>
        <p className="switch-price">${accessory.price.toFixed(2)}</p>
        <p className="switch-type">Type: {accessory.type}</p>
        <p className="switch-rating">Rating: {averageRating}⭐</p>
      </div>
    </div>
  );
};   

export default AccessoryCard;

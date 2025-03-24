import React from 'react';
import '../styles/SwitchesPage.css';

const SwitchCard = ({ switchItem, onClick }) => {
  const averageRating =
    switchItem.reviews && switchItem.reviews.length > 0
      ? (switchItem.reviews.reduce((acc, cur) => acc + cur, 0) / switchItem.reviews.length).toFixed(1)
      : "No reviews";

  return (
    <div className="switch-card" onClick={() => onClick(switchItem)}>
      <img
        src={switchItem.images[switchItem.selectedColor]}
        alt={`${switchItem.name} - ${switchItem.selectedColor}`}
        className="switch-image"
      />

      <div className="switch-details">
        <h2>{switchItem.name}</h2>
        <p className="switch-price">${switchItem.price.toFixed(2)}</p>
        <p className="switch-type">Type: {switchItem.type}</p>
        <p className="switch-rating">Rating: {averageRating}⭐</p>
      </div>
    </div>
  );
};   

export default SwitchCard;

import React from 'react';
import '../styles/KeyboardsPage.css';

const KeyboardCard = ({ keyboard, onClick }) => {
  const averageRating =
    keyboard.reviews && keyboard.reviews.length > 0
      ? (keyboard.reviews.reduce((acc, cur) => acc + cur, 0) / keyboard.reviews.length).toFixed(1)
      : "No reviews";

  return (
    <div className="keyboard-card" onClick={() => onClick(keyboard)}>
      <img
        src={keyboard.images[keyboard.selectedColor]}
        alt={`${keyboard.name} - ${keyboard.selectedColor}`}
        className="keyboard-image" />

      <div className="keyboard-details">
        <h2>{keyboard.name}</h2>
        <p className="keyboard-price">${keyboard.price}</p>
        <p className="keyboard-color">Color: {keyboard.selectedColor}</p>
        <p className="keyboard-rating">Rating: {averageRating}⭐</p>
        <p className="keyboard-connectivity">Connectivity: {keyboard.connectivity}</p>
      </div>
    </div>
  );
};

export default KeyboardCard;

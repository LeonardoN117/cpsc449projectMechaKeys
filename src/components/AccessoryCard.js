import React from 'react';
import '../styles/AccessoriesPage.css';

const AccessoryCard = ({ accessory, onClick }) => {
  const averageRating =
    accessory.reviews && accessory.reviews.length > 0
      ? (accessory.reviews.reduce((acc, cur) => acc + cur, 0) / accessory.reviews.length).toFixed(1)
      : "No reviews";

  return (
    <div className="accessory-card" onClick={() => onClick(accessory)}>
      <div className='image-container'>
        <img
          src={accessory.images[accessory.selectedColor]}
          alt={`${accessory.name} - ${accessory.selectedColor}`}
          className="accessory-image"
        />
      </div>
      <div className="accessory-details">
        <h2>{accessory.name}</h2>
        <p className="accessory-price">${accessory.price.toFixed(2)}</p>
        <p className="accessory-type">Type: {accessory.type}</p>
        <p className="accessory-rating">Rating: {averageRating}⭐</p>
      </div>
    </div>
  );
};   

export default AccessoryCard;

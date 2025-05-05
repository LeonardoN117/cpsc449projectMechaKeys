import React from 'react';
import '../styles/KeyboardsPage.css';
import ReviewSection from "./ReviewSection";

const SwitchModal = ({
  Switch,
  selectedColor,
  onColorChange,
  onAddToCart,
  onClose,
  onAddReview,
  canReview
}) => {
  const averageRating =
    Switch.reviews && Switch.reviews.length > 0
      ? (Switch.reviews.reduce((acc, cur) => acc + cur, 0) / Switch.reviews.length).toFixed(1)
      : "No reviews";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{Switch.name}</h2>
        <img src={Switch.images[Switch.selectedColor]} alt={`${Switch.name} - ${Switch.selectedColor}`} className="modal-image" />
        <p>{Switch.description}</p>
        <p className="Switch-price">${Switch.price}</p>
        <p className="Switch-rating">Rating: {averageRating}⭐</p>
        <p className="Switch-connectivity">Connectivity: {Switch.connectivity}</p>
        <div className="modal-form">
          <label>
            Select Color:
            <select value={selectedColor} onChange={onColorChange}>
              {Switch.availableColors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
          <button className="save-button" onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
        {/* Only allow reviews if the user has ordered this Switch */}
        <ReviewSection reviews={Switch.reviews} onAddReview={onAddReview} canReview={canReview} />
      </div>
    </div>
  );
};

export default SwitchModal;

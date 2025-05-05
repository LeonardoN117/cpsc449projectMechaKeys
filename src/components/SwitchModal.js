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

  const currentImageSrc = Switch.images[selectedColor];
  const currentAltText = `${Switch.name} - ${selectedColor}`;
  
  return (
    <div
  className="modal-overlay"
  onClick={(e) => {
    // Close only if clicking directly on the overlay, not modal content
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  }}
>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{Switch.name}</h2>
        <img
          src={currentImageSrc}
          alt={currentAltText}
          className="modal-image"
          style={{ objectFit: 'contain' }}
        />
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
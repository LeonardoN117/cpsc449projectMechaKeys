import React from 'react';
import '../styles/KeyboardsPage.css';
import ReviewSection from "./ReviewSection";

const KeyboardModal = ({
  keyboard,
  selectedColor,
  onColorChange,
  onAddToCart,
  onClose,
  onAddReview,
  canReview
}) => {
  const averageRating =
    keyboard.reviews && keyboard.reviews.length > 0
      ? (keyboard.reviews.reduce((acc, cur) => acc + cur, 0) / keyboard.reviews.length).toFixed(1)
      : "No reviews";

  const currentImageSrc = keyboard.images[selectedColor];
  const currentAltText = `${keyboard.name} - ${selectedColor}`;
  
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
        <h2>{keyboard.name}</h2>
        <img src={currentImageSrc} alt={currentAltText} className="modal-image" style={{ objectFit: 'contain' }} />
        <p>{keyboard.description}</p>
        <p className="keyboard-price">${keyboard.price}</p>
        <p className="keyboard-rating">Rating: {averageRating}⭐</p>
        <p className="keyboard-connectivity">Connectivity: {keyboard.connectivity}</p>
        <div className="modal-form">
          <label>
            Select Color:
            <select value={selectedColor} onChange={onColorChange}>
              {keyboard.availableColors.map((color, index) => (
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
        <ReviewSection reviews={keyboard.reviews} onAddReview={onAddReview} canReview={canReview} />
      </div>
    </div>

  );
};

export default KeyboardModal;
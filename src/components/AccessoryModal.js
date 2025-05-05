import React from 'react';
import '../styles/AccessoriesPage.css';
import ReviewSection from "./ReviewSection";

const AccessoryModal = ({
  accessory,
  selectedColor,
  onColorChange,
  onAddToCart,
  onClose,
  onAddReview,
  canReview
}) => {
    const averageRating =
        accessory.reviews && accessory.reviews.length > 0
            ? (accessory.reviews.reduce((acc, cur) => acc + cur, 0) / accessory.reviews.length).toFixed(1)
            : "No reviews";

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{accessory.name}</h2>
                <img src={accessory.images[accessory.selectedColor]} alt={`${accessory.name} - ${accessory.selectedColor}`} className="modal-image" />
                <p>{accessory.description}</p>
                <p className="accessory-price">${accessory.price}</p>
                <p className="accessory-rating">Rating: {averageRating}⭐</p>
                <p className="accessory-connectivity">Connectivity: {accessory.connectivity}</p>
                <div className="modal-form">
                    <label>
                        Select Color:
                        <select value={selectedColor} onChange={onColorChange}>
                        {accessory.availableColors.map((color, index) => (
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
            {/* Only allow reviews if the user has ordered this accessory */}
            <ReviewSection reviews={accessory.reviews} onAddReview={onAddReview} canReview={canReview} />
        </div>
        </div>
    );
};

export default AccessoryModal;

import React, { useState } from 'react';
import '../styles/KeyboardsPage.css';

const ReviewSection = ({ reviews, onAddReview, canReview }) => {
  const [newRating, setNewRating] = useState('');
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, cur) => acc + cur, 0) / reviews.length).toFixed(1)
      : "No reviews yet";

  const handleSubmit = (e) => {
    e.preventDefault();
    const ratingNum = parseFloat(newRating);
    if (ratingNum >= 1 && ratingNum <= 5) {
      onAddReview(ratingNum);
      setNewRating('');
    } else {
      alert("Please enter a rating between 1 and 5");
    }
  };

  return (
    <div className="review-section">
      <h3>User Reviews</h3>
      <p>Average Rating: {averageRating} ⭐</p>
      {canReview ? (
        <form onSubmit={handleSubmit}>
          <label>
            Add your review (1-5):
            <input
              type="number"
              min="1"
              max="5"
              step="0.1"
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
            />
          </label>
          <button type="submit">Submit Review</button>
        </form>
      ) : (
        <p>You must purchase this keyboard to leave a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;

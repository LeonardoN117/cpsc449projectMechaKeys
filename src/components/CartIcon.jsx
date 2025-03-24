import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation

// Example Cart Icon (You can replace this with an actual cart icon, e.g., from Font Awesome)
const CartIcon = () => {
  return (
    <div className="fixed top-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-600">
      <Link to="/Cart"> {/* Link to your cart page */}
        <img 
          src=" ../assets/cartimage.jpeg"  // Replace with a real cart image or icon
          alt="Cart"
          className="w-8 h-8 object-cover"
        />
      </Link>
    </div>
  );
};

export default CartIcon;

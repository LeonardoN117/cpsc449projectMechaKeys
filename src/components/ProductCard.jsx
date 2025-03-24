import React from "react";


const SwitchCard = ({ switchItem }) => {
  return (
    <div className="product"> {/* Use 'product' class for consistency */}
      <img
        src={switchItem.image}
        alt={switchItem.name}
        className="w-full h-auto object-cover"
      />
      <div className="description">
        <h2 className="text-lg font-semibold">{switchItem.name}</h2>
        <p className="text-teal-600 font-bold">{switchItem.price}</p>
        <p className="text-sm">Type: {switchItem.type}</p>
        <p className="text-sm">Actuation Force: {switchItem.actuationForce}</p>
        <p className="text-sm">Rating: {switchItem.rating} ⭐</p>
      </div>
    </div>
  );
};

export default SwitchCard;

import React from 'react';
import '../styles/KeyboardsPage.css';

const Cart = ({ cart, onRemoveFromCart, onCheckout }) => (
  <div className="cart-section">
    <h2>Your Cart</h2>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <>
        <ul>
          {cart.map((item, index) => (
            <li key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={item.images?.[item.selectedColor] || "images/logo.png"}
                alt={item.name}
                style={{ width: "60px", height: "60px", objectFit: "contain" }}
              />
              <span>
                {item.name} - {item.selectedColor} - ${item.price} x {item.quantity}
              </span>
              <button onClick={() => onRemoveFromCart(item.id, item.selectedColor)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button className="checkout-button" onClick={onCheckout}>Checkout</button>
      </>
    )}
  </div>
);

export default Cart;

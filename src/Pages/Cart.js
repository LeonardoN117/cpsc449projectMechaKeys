import React from "react";
import "../styles/KeyboardsPage.css";
import Cart from "../components/Cart";

function CartPage({ cart, removeFromCart, handleCheckout }) {

  return (
    <div className="content-wrapper">
      <Cart cart={cart} onRemoveFromCart={removeFromCart} onCheckout={handleCheckout} />
    </div>
  );
}

export default CartPage;

import React, { useEffect, useState } from "react";
import "../styles/orderHistory.css";
import { supabase } from "../data/supabaseClient";
import { keyboardsData } from "../data/keyboardData";
import { switchData } from "../data/switchData";
import { accessoriesData } from "../data/AccessoriesData"; 

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch orders:", error.message);
      } else {
        setOrders(data);
      }
    };

    fetchOrders();
  }, []);

  const findProductImage = (productName, selectedColor) => {
    const allProducts = [...keyboardsData, ...switchData, ...(accessoriesData || [])];
    const match = allProducts.find(
      (p) => p.name === productName && p.images?.[selectedColor]
    );
    return match?.images?.[selectedColor] || "/images/logo.png";
  };

  return (
    <div className="history-container">
      <h2 style={{ textAlign: "center" }}>Order History</h2>
      {orders.length === 0 ? (
        <p style={{ textAlign: "center" }}>You have no past orders.</p>
      ) : (
        <ul className="order-list">
          {orders.map((order, index) => (
            <li key={index} className="order-item">
              <img
                src={findProductImage(order.product_name, order.selected_color)}
                alt={order.product_name}
                className="order-thumb"
              />
              <div>
                <h3>{order.product_name}</h3>
                <p>Color: {order.selected_color}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Price: ${order.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistoryPage;

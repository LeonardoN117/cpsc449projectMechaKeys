import SwitchCard from "../components/ProductCard";
import React, { useState } from "react";
import "../styles/Switches.css";


const switches = [
  { id: 1, name: "Gateron INK Black V2", price: "$7.50", type: "Linear", actuationForce: "60g", rating: "4.8/5", image: "https://images.discovery-prod.axs.com/2024/06/sammy-virji-tickets_12-06-24_17_66705eca44c7a.jpg" },
  { id: 2, name: "Gateron Milky Yellow", price: "$3.00", type: "Linear", actuationForce: "50g", rating: "4.6/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 3, name: "Prevail Epsilon Switch", price: "$7.00", type: "Tactile", actuationForce: "58g", rating: "4.7/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 4, name: "Gateron Oil King", price: "$6.50", type: "Linear", actuationForce: "55g", rating: "4.9/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 5, name: "NovelKeys Cream", price: "$5.50", type: "Linear", actuationForce: "55g", rating: "4.5/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 6, name: "GAZZEW Boba LT RGB", price: "$6.00", type: "Tactile", actuationForce: "62g", rating: "4.6/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 7, name: "Gateron Yellow Pro", price: "$4.50", type: "Linear", actuationForce: "50g", rating: "4.7/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 8, name: "Gateron BOX INK Black", price: "$8.00", type: "Linear", actuationForce: "65g", rating: "4.8/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
  { id: 9, name: "Everglide Aqua King", price: "$9.00", type: "Linear", actuationForce: "55g", rating: "4.9/5", image: "https://hyperx.com/cdn/shop/files/hyperx_tactile_switch_85u08aa_angle_2_1512x.jpg?v=1730147959" },
];

function SwitchesPage() {
  const [filter, setFilter] = useState("All");

  const filteredSwitches = switches.filter(
    (item) => filter === "All" || item.type === filter
  );


  
  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-900 drop-shadow-lg">
        Our Switch Collection
      </h1>
      <p className="text-lg text-center text-gray-700 mb-6">
        Browse our selection of high-quality switches for your keyboard.
      </p>

      <div className="flex justify-center mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="All">All</option>
          <option value="Linear">Linear</option>
          <option value="Tactile">Tactile</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredSwitches.map((switchItem) => (
          <SwitchCard key={switchItem.id} switchItem={switchItem} />
        ))}
      </div>

      <a
        href="/"
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
      >
        Home
      </a>
    </>
  );
}

export default SwitchesPage;

import React, { useState, useEffect } from "react";
import { supabase } from "../data/supabaseClient";
import "../styles/SwitchesPage.css";
import { switchData } from "../data/switchData";
import SwitchCard from "../components/SwitchCard";
import SwitchModal from "../components/SwitchModal";
import Filters from "../components/Filters";

function SwitchPage({ addToCart, user}) {
  const [switches, setSwitches] = useState(switchData);
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const handleCardClick = (switchItem) => {
    setSelectedSwitch(switchItem);
    setSelectedColor(switchItem.selectedColor);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedSwitch) {
      addToCart(selectedSwitch, selectedColor);
      setSelectedSwitch(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let displayedSwitches = switches.filter((switchItem) =>
    switchItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "priceLowToHigh") {
    displayedSwitches.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    displayedSwitches.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name") {
    displayedSwitches.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleAddReview = (newRating) => {
    if (!selectedSwitch) return;
    const switchId = selectedSwitch.id;
    
    setSwitches((prevSwitches) =>
      prevSwitches.map((sw) => {
        if (sw.id === switchId) {
          return { ...sw, reviews: [...sw.reviews, newRating] };
        }
        return sw;
      })
    );

    setSelectedSwitch((prev) =>
      prev ? { ...prev, reviews: [...prev.reviews, newRating] } : null
    );
  };

  // The user can review if the selected switch appears in their orders
  const [canReview, setCanReview] = useState(false);

useEffect(() => {
  const checkIfOrdered = async () => {
    if (!selectedSwitch || !user) return setCanReview(false);
    
    const { data, error } = await supabase
      .from("orders")
      .select("product_name")
      .eq("user_id", user.id)
      .eq("product_name", selectedSwitch.name);

    setCanReview(data && data.length > 0);
  };

  checkIfOrdered();
}, [selectedSwitch, user]);


  return (
    <div className="switch-page">
      <h1>Switches</h1>
      <p>Browse our selection of high-quality Switch switches.</p>

      <Filters
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      <div className="switch-grid">
        {displayedSwitches.map((switchItem) => (
          <SwitchCard key={switchItem.id} switchItem={switchItem} onClick={handleCardClick} />
        ))}
      </div>

      {selectedSwitch && (
        <SwitchModal
          Switch={selectedSwitch}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedSwitch(null)}
          onAddReview={handleAddReview}
          canReview={canReview}
        />
      )}
    </div>
  );
}

export default SwitchPage;
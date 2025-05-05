import React, { useState, useEffect } from "react";
import { supabase } from "../data/supabaseClient";
import "../styles/AccessoriesPage.css";
import { accessoriesData } from "../data/AccessoriesData";
import Filters from "../components/Filters";
import AccessoryCard from "../components/AccessoryCard";
import AccessoryModal from "../components/AccessoryModal";

function AccessoriesPage({ addToCart, user }) {
  const [accessories, setAccessories] = useState(accessoriesData);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const handleCardClick = (accessory) => {
    setSelectedAccessory(accessory);
    setSelectedColor(accessory.selectedColor);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedAccessory) {
      addToCart(selectedAccessory, selectedColor);
      setSelectedAccessory(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let displayedAccessory = accessories.filter((accessory) =>
    accessory.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "priceLowToHigh") {
    displayedAccessory.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    displayedAccessory.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name") {
    displayedAccessory.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleAddReview = (newRating) => {
    if (!selectedAccessory) return;
    const accessoryId = selectedAccessory.id;
    
    setAccessories((prevAccessories) =>
        prevAccessories.map((ac) => {
        if (ac.id === accessoryId) {
          return { ...ac, reviews: [...ac.reviews, newRating] };
        }
        return ac;
      })
    );

    setSelectedAccessory((prev) =>
      prev ? { ...prev, reviews: [...prev.reviews, newRating] } : null
    );
  };

  // The user can review if the selected switch appears in their orders
  const [canReview, setCanReview] = useState(false);

useEffect(() => {
  const checkIfOrdered = async () => {
    if (!selectedAccessory || !user) return setCanReview(false);
    
    const { data, error } = await supabase
      .from("orders")
      .select("product_name")
      .eq("user_id", user.id)
      .eq("product_name", selectedAccessory.name);

    setCanReview(data && data.length > 0);
  };

  checkIfOrdered();
}, [selectedAccessory, user]);


  return (
    <div className="accessory-page">
      <h1>Accessories</h1>
      <p>Browse our selection of accessories to expand your keboard and gaming experience.</p>

      <Filters
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      <div className="switch-grid">
        {displayedAccessory.map((accessory) => (
          <AccessoryCard key={accessory.id} accessory={accessory} onClick={handleCardClick} />
        ))}
      </div>

      {selectedAccessory && (
        <AccessoryModal
          accessory={selectedAccessory}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedAccessory(null)}
          onAddReview={handleAddReview}
          canReview={canReview}
        />
      )}
    </div>
  );
}

export default AccessoriesPage;

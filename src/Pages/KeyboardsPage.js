import React, { useState, useEffect } from "react";
import { supabase } from "../data/supabaseClient";
import "../styles/KeyboardsPage.css";
import { keyboardsData } from "../data/keyboardData";
import KeyboardCard from "../components/KeyboardCard";
import KeyboardModal from "../components/KeyboardModal";
import Filters from "../components/Filters";

function KeyboardPage({ addToCart, user}) {
  const [keyboards, setKeyboards] = useState(keyboardsData);
  const [selectedKeyboard, setSelectedKeyboard] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const handleCardClick = (keyboard) => {
    setSelectedKeyboard(keyboard);
    setSelectedColor(keyboard.selectedColor);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleAddToCart = () => {
    if (selectedKeyboard) {
      addToCart(selectedKeyboard, selectedColor);
      setSelectedKeyboard(null);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  let displayedKeyboards = keyboards.filter(keyboard =>
    keyboard.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortOption === "priceLowToHigh") {
    displayedKeyboards.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighToLow") {
    displayedKeyboards.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name") {
    displayedKeyboards.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleAddReview = (newRating) => {
    if (!selectedKeyboard) return;
    const keyboardId = selectedKeyboard.id;
    // Update the keyboards data
    setKeyboards(prevKeyboards => prevKeyboards.map(kb => {
      if (kb.id === keyboardId) {
        return { ...kb, reviews: [...kb.reviews, newRating] };
      }
      return kb;
    }));
    // Update the selected keyboard (for immediate modal display)
    setSelectedKeyboard(prev => prev ? { ...prev, reviews: [...prev.reviews, newRating] } : null);
  };

  // The user can review if the selected keyboard appears in their orders
  const [canReview, setCanReview] = useState(false);

  useEffect(() => {
    const checkIfOrdered = async () => {
      if (!selectedKeyboard || !user) return setCanReview(false);
      
      const { data, error } = await supabase
        .from("orders")
        .select("product_name")
        .eq("user_id", user.id)
        .eq("product_name", selectedKeyboard.name);
  
      setCanReview(data && data.length > 0);
    };
  
    checkIfOrdered();
  }, [selectedKeyboard, user]);
  

  return (
    <div className="keyboard-page">
      <h1>Keyboards</h1>
      <p>Browse our selection of high-quality mechanical keyboards.</p>

      <Filters
        searchTerm={searchTerm}
        sortOption={sortOption}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      <div className="keyboard-grid">
        {displayedKeyboards.map((keyboard) => (
          <KeyboardCard key={keyboard.id} keyboard={keyboard} onClick={handleCardClick} />
        ))}
      </div>

      {selectedKeyboard && (
        <KeyboardModal
          keyboard={selectedKeyboard}
          selectedColor={selectedColor}
          onColorChange={handleColorChange}
          onAddToCart={handleAddToCart}
          onClose={() => setSelectedKeyboard(null)}
          onAddReview={handleAddReview}
          canReview={canReview}
        />
      )}
    </div>
  );
}

export default KeyboardPage;

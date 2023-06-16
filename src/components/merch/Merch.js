import React, { useEffect, useState } from "react";
import "./Merch.css";
import { MerchForm } from "./MerchForm";

export const MerchList = () => {
  const [merchandise, updateMerch] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8088/merchandise")
      .then((res) => res.json())
      .then((merchArray) => {
        updateMerch(merchArray);
      });
  }, []);

  const addMerchItem = (newMerchItem) => {
    updateMerch([...merchandise, newMerchItem]);
  };

  const handleButtonClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <h2>Merchandise</h2>
      {!showForm && <button onClick={handleButtonClick}>Add Merch Item</button>}
      {showForm && <MerchForm addMerchItem={addMerchItem} />}
      <div className="merch-container">
        {merchandise.map((merch) => (
          <section id="merchandise" className="merchandise" key={merch.id}>
            <img src={merch.image} alt="Merchandise" />
            <header>Size: {merch.size}</header>
            <footer>Price: ${merch.price} USD</footer>
          </section>
        ))}
      </div>
    </>
  );
};







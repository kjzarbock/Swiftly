import React, { useState } from "react";

export const MerchForm = ({ addMerchItem }) => {
  const [merchItem, setMerchItem] = useState({
    size: "",
    price: 0,
    image: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMerchItem({ ...merchItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8088/merchandise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(merchItem),
      });

      if (response.ok) {
        const newItem = await response.json();
        addMerchItem(newItem);
        // Reset form fields
        setMerchItem({ size: "", price: 0, image: "" });
      } else {
        console.error("Failed to add merch item:", response.status);
      }
    } catch (error) {
      console.error("Failed to add merch item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Size:
        <input
          type="text"
          name="size"
          value={merchItem.size}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={merchItem.price}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Image URL:
        <input
          type="text"
          name="image"
          value={merchItem.image}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Add Merch Item</button>
    </form>
  );
};





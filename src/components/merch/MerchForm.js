import React, { useState } from "react";

export const MerchForm = ({ addMerchItem }) => {
  const [merchItem, setMerchItem] = useState({
    id: 0,
    size: "",
    price: 0,
    image: "",
    email: "",
  });

  const [formVisible, setFormVisible] = useState(true);
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObject = JSON.parse(localHoneyUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMerchItem({ ...merchItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the submitted email matches the honeyUserObject email
    if (merchItem.email !== honeyUserObject.email) {
      window.alert("Emails do not match");
      return;
    }

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
        setMerchItem({
          id: 0,
          size: "",
          price: 0,
          image: "",
          email: honeyUserObject.email,
        });
        // Hide the form
        setFormVisible(false);
      } else {
        console.error("Failed to add merch item:", response.status);
      }
    } catch (error) {
      console.error("Failed to add merch item:", error);
    }
  };

  const handleShowForm = () => {
    setFormVisible(true);
  };

  if (!formVisible) {
    return (
      <>
        <p>Merch item submitted successfully!</p>
        <button onClick={handleShowForm}>Submit More Items</button>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Size:
        <select name="size" value={merchItem.size} onChange={handleInputChange}>
          <option value="">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
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
      <label>
        User Email:
        <input
          type="text"
          name="email"
          value={merchItem.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button type="submit">Add Merch Item</button>
    </form>
  );
};












import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MerchEditor } from "./MerchEdit.js";

export const MerchForm = () => {
  const [merchItem, setMerchItem] = useState({
    id: 0,
    size: "",
    price: 0,
    image: "",
    email: "",
  });

  const [merch, setMerch] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const localSwiftlyUser = localStorage.getItem("swiftly_user");
  const swiftlyUserObject = JSON.parse(localSwiftlyUser);

  const [editingMerchId, setEditingMerchId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8088/merchandise")
      .then((response) => response.json())
      .then((merchandiseArray) => {
        setMerch(merchandiseArray);
      });
  }, []);

  useEffect(() => {
    UserArray2();
  }, []);

  const UserArray2 = () => {
    fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((userArray) => {
        setUsers(userArray);
      });
  }

  useEffect(() => {
    if (editingMerchId) {
      fetch(`http://localhost:8088/merchandise/${editingMerchId}`)
        .then((response) => response.json())
        .then((merchData) => {
          setMerchItem(merchData);
        });
    }
  }, [editingMerchId]);

  const handleSubmit = () => {

    const merchToSendToAPI = {
      id: merchItem.id,
      size: merchItem.size,
      price: merchItem.price,
      image: merchItem.image,
      email: swiftlyUserObject.email,
    };

    if (editingMerchId) {
      fetch(`http://localhost:8088/merchandise/${editingMerchId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(merchToSendToAPI),
      })
        .then((response) => response.json())
        .then(() => {
          setEditingMerchId(null);
          setMerchItem({
            id: 0,
            size: "",
            price: 0,
            image: "",
            email: "",
          });
          MerchArray();
        })
        .catch((error) => {
          console.error("Error updating merch:", error);
        });
    } else {
      fetch("http://localhost:8088/merchandise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(merchToSendToAPI),
      })
        .then((response) => response.json())
        .then(() => {
          MerchArray();
        })
        .catch((error) => {
          console.error("Error submitting merch:", error);
        });
    }
  };

  const handleEdit = (merchId) => {
    setEditingMerchId(merchId);
  };

  const handleDelete = (merchId) => {
    fetch(`http://localhost:8088/merchandise/${merchId}`, {
      method: "DELETE",
    })
      .then(() => {
        MerchArray(); 
      })
      .catch((error) => {
        console.error("Error deleting merch:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMerchItem((prevMerchItem) => ({
      ...prevMerchItem,
      [name]: value,
    }));
  };

  const MerchArray = () => {
    fetch("http://localhost:8088/merchandise")
      .then((response) => response.json())
      .then((merchandiseArray) => {
        setMerch(merchandiseArray);
      });
  };

  return (
    <div>
      <h2>Submit Merch</h2>
      <form>
        <label>
          Size:
          <select name="size" value={merchItem.size} onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </label>

        <label>
          Price:
          <input
            type="number"
            name="price"
            value={merchItem.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={merchItem.image}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="email">User E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={swiftlyUserObject.email}
          onChange={handleChange}
        />
<button onClick={(evt)=>handleSubmit (evt)}>Submit</button>
      </form>

      {swiftlyUserObject.email && (
        <MerchEditor
          userEmail={swiftlyUserObject.email}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};



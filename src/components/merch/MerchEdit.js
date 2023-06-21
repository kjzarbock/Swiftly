import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const MerchEditor = ({ userEmail, onEdit, onDelete }) => {
  const [merch, setMerch] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8088/merchandise?email=${userEmail}`)
      .then((response) => response.json())
      .then((merchArray) => {
        setMerch(merchArray);
      });
  }, [userEmail]);

  const handleDelete = (merchId) => {
    fetch(`http://localhost:8088/merchandise/${merchId}`, {
      method: "DELETE",
    })
      .then(() => {
        setMerch((prevMerch) =>
          prevMerch.filter((merch) => merch.id !== merchId)
        );
        onDelete(merchId);
      })
      .catch((error) => {
        window.alert("Error deleting merch item");
      });
  };

  return (
    <div>
      <h2>Edit Merch</h2>
      {merch.length > 0 ? (
        <ul>
          {merch.map((item) => (
            <li key={item.id}>
              Merch ID: {item.id}
              <button onClick={() => onEdit(item.id)}>Edit</button>
              {userEmail === item.email && (
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No merch found for editing.</p>
      )}
    </div>
  );
};

import React, { useState, useEffect } from "react";

export const MerchEditor = ({ userEmail, onEdit, onDelete }) => {
  const [merch, setMerch] = useState([]);

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
        window.location.reload(); 
      })
  };

  return (
    <div>
      {merch.length > 0 ? (
        <ul>
          <h2 className="merch">My Merch</h2>
          {merch.map((item) => (
            <li key={item.id}>
              My Merch: {item.id} ${item.price} Size: {item.size}
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

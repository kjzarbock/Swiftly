import { useEffect, useState } from "react";

export const MerchList = () => {
  const [merchandise, updateMerch] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/merchandise")
      .then((res) => res.json())
      .then((merchArray) => {
        updateMerch(merchArray);
      });
  }, []);

  return (
    <>
      <h2>Merchandise</h2>
      <ul>
        {merchandise.map((merch) => (
          <section id="merchandise" className="merchandise" key={merch.id}>
            <img src={merch.image} alt="Merchandise" />
            <header>Size: {merch.size}</header>
            <footer>Price: {merch.price}</footer>
          </section>
        ))}
      </ul>
    </>
  );
};





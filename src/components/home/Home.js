import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is the home page of my website.</p>
      <p>Feel free to explore and navigate through the site.</p>
    </div>
  );
};

export default Home;

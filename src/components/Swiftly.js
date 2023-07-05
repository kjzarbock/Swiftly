import { Route, Routes } from "react-router-dom";
import { Authorized } from "./views/Authorized";
import { ApplicationViews } from "./views/ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Swiftly.css";
import { useState, useEffect } from "react";

export const Swiftly = () => {
  const darkModePreference = localStorage.getItem("swiftly_dark_mode");
  const [isDarkMode, setIsDarkMode] = useState(darkModePreference === "true");

  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "";
    }
    localStorage.setItem("swiftly_dark_mode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <Authorized>
              <>
                <NavBar
                  isDarkMode={isDarkMode}
                  setIsDarkMode={setIsDarkMode}
                />
                <button
                  className="dark-mode-button"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? "Speak Now Era" : "Reputation Era"}
                </button>
                <ApplicationViews />
              </>
            </Authorized>
          }
        />
      </Routes>
    </div>
  );
};

  
  
  




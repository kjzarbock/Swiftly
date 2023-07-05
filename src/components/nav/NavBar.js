import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ul className="navbar">
      <a href="/">
        <img
          src={isDarkMode ? "https://i.imgur.com/RLmkFZ6.jpg" : "https://i.imgur.com/RLmkFZ6.jpg"}
          style={{ width: "150px", height: "40px" }}
          alt="Logo"
        />
      </a>

      <li className="navbar__item navbar__logout">
        <button style={{ color: "white", border: "1px solid white" }}>
          <Link className="navbar__link" to="/shows">
            Shows
          </Link>
        </button>
      </li>
      <li className="navbar__item active">
        <button style={{ color: "white", border: "1px solid white" }}>
          <Link className="navbar__link" to="/tickets">
            Tickets
          </Link>
        </button>
      </li>
      <li className="navbar__item active">
        <button style={{ color: "white", border: "1px solid white" }}>
          <Link className="navbar__link" to="/merchandise">
            Merchandise
          </Link>
        </button>
      </li>
      <li className="navbar__item active">
        <button style={{ color: "white", border: "1px solid white" }}>
          <Link className="navbar__link" to="/about">
            About Us
          </Link>
        </button>
      </li>
      <li className="navbar__item">
        <label className="switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleDarkModeToggle}
          />
          <span className="slider"></span>
        </label>
        <span className="dark-mode-label">
          {isDarkMode ? "Speak Now Era" : "Reputation Era"}
        </span>
      </li>
      {localStorage.getItem("swiftly_user") ? (
        <li className="navbar__item navbar__logout">
          <button
            style={{ color: "white", border: "1px solid white" }}
            onClick={() => {
              localStorage.removeItem("swiftly_user");
              navigate("/", { replace: true });
            }}
          >
            <Link className="navbar__link" to="">
              Logout
            </Link>
          </button>
        </li>
      ) : null}
    </ul>
  );
};






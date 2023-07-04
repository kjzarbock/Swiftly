import { useEffect, useState } from "react";
import "./ShowList.css";

export const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [filteredShows, setFilteredShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:8088/shows")
      .then((response) => response.json())
      .then((showArray) => {
        setShows(showArray);
      });
  }, []);

  useEffect(() => {
    if (filterType === "all") {
      setFilteredShows(shows);
    } else if (filterType === "international") {
      setFilteredShows(shows.filter((show) => show.isInternational));
    } else if (filterType === "domestic") {
      setFilteredShows(shows.filter((show) => !show.isInternational));
    }
  }, [filterType, shows]);

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const handleSearch = () => {
    const filteredResults = shows.filter((show) =>
      show.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredShows(filteredResults);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <h2>List of Shows</h2>
      <div className="show-list-container">
        <div className="filter-buttons">
          <button onClick={() => handleFilter("all")}>All Shows</button>
          <button onClick={() => handleFilter("domestic")}>USA</button>
          <button onClick={() => handleFilter("international")}>
            International
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by city"
            value={searchQuery}
            onChange={handleChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="shows">
          {filteredShows.map((show) => (
            <section id="show" className="show" key={show.id}>
              <header>City: {show.city}</header>
              <header>Date: {show.date}</header>
              <footer>Opener: {show.opener}</footer>
            </section>
          ))}
        </div>
        <div className="image-shows">
          <a>
            <img src="https://i.imgur.com/t6bYtY5.jpg" alt="Taylor Swift" title="Taylor Swift" />
          </a>
        </div>
      </div>
    </>
  );
};



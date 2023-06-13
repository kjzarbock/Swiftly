import { useEffect, useState } from "react";
import "./ShowList.css";

export const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [filterType, setFilterType] = useState("all");
    const [filteredShows, setFilteredShows] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8088/shows`)
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

    return (
        <>
            <h2>List of Shows</h2>
            <div className="show-list-container">
                <div className="filter-buttons">
                    <button onClick={() => handleFilter("all")}>All Shows</button>
                    <button onClick={() => handleFilter("domestic")}>USA</button>
                    <button onClick={() => handleFilter("international")}>International</button>
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
                    <a href="https://imgur.com/lW2lgpz">
                        <img src="https://i.imgur.com/lW2lgpz.jpg" title="Taylor Swift" />
                    </a>
                </div>
            </div>
        </>
    );
};

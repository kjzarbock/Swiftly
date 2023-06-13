import { useEffect, useState } from "react";
import "./ShowList.css";

export const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/shows`)
      .then((response) => response.json())
      .then((showArray) => {
        setShows(showArray);
      });
  }, []);

  return (
    <>
      <h2>List of Shows</h2>
      <div className="show-list-container">
        <article className="shows">
          {shows.map((show) => (
            <section id="show" className="show" key={show.id}>
              <header>City: {show.city}</header>
              <header>Date: {show.date}</header>
              <footer>Opener: {show.opener}</footer>
            </section>
          ))}
        </article>
        <div className="image-shows">
          <a href="https://imgur.com/lW2lgpz">
            <img src="https://i.imgur.com/lW2lgpz.jpg" title="source: imgur.com" />
          </a>
        </div>
      </div>
    </>
  );
};

import React, { useEffect, useState } from "react";
import "./TicketList.css";
import { useNavigate } from "react-router-dom";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8088/tickets?_expand=show")
      .then((response) => response.json())
      .then((ticketArray) => {
        setTickets(ticketArray);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTickets = tickets.filter((ticket) => {
    const { city, date, section, row, seat, price, userId } = ticket.show;
    const searchString = `${city} ${date} ${section} ${row} ${seat} ${price} ${userId}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <>
      <div className="ticket-actions">
        <button className="add-ticket-button" onClick={() => navigate("/tickets/create")}>
          Add, Edit or Delete Ticket
        </button>
        <h2>List of Available Tickets</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by City or Date"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="ticket-container">
        <div className="image-container">
          <img src="https://i.imgur.com/lW2lgpz.jpg" alt="Taylor Swift" title="Taylor Swift" />
        </div>
        <article className="tickets">
          {filteredTickets.map((ticket) => (
            <section id="ticket" className="ticket" key={ticket.id}>
              <header>City: {ticket.show.city}</header>
              <header>Date: {ticket.show.date}</header>
              <header>Section: {ticket.section}</header>
              <header>Row: {ticket.row}</header>
              <header>Seat: {ticket.seat}</header>
              <header>Price: ${ticket.price} USD</header>
              <footer>
                Contact:{" "}
                <a href={`mailto:${ticket.email}`}>{ticket.email}</a>
              </footer>
            </section>
          ))}
        </article>
      </div>
    </>
  );
};





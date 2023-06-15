import { useEffect, useState } from "react";
import "./TicketList.css";
import { useNavigate } from "react-router-dom";

export const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8088/tickets?_expand=show&_expand=user")
      .then((response) => response.json())
      .then((ticketArray) => {
        setTickets(ticketArray);
      });
  }, []);

  return (
    <>
      <h2>List of Tickets</h2>
      <button onClick={() => navigate("/tickets/create")}>Add Ticket</button>
      <div className="ticket-container">
        <article className="tickets">
          {tickets.map((ticket) => (
            <section id="ticket" className="ticket" key={ticket.id}>
              <header>City: {ticket.show.city}</header>
              <header>Date: {ticket.show.date}</header>
              <header>Section: {ticket.section}</header>
              <header>Row: {ticket.row}</header>
              <header>Seat: {ticket.seat}</header>
              <header>Price: ${ticket.price} USD</header>
              <footer>User email: {ticket.userId}</footer>
            </section>
          ))}
        </article>
      </div>
    </>
  );
};


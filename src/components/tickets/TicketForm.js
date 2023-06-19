import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const TicketForm = () => {
  const [ticket, setTicket] = useState({
    id: "",
    showId: "",
    date: "",
    section: "",
    row: "",
    seat: "",
    price: "",
    email: "",
  });

  const [shows, setShows] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const localHoneyUser = localStorage.getItem("honey_user");
  const honeyUserObject = JSON.parse(localHoneyUser);



  useEffect(() => {
    fetch("http://localhost:8088/shows")
      .then((response) => response.json())
      .then((showArray) => {
        setShows(showArray);
      });

    fetch("http://localhost:8088/users")
      .then((response) => response.json())
      .then((userArray) => {
        setUsers(userArray);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the ticket data to the server or perform any other necessary actions
    const ticketToSendToAPI = {
      id: ticket.id,
      showId: parseInt(ticket.showId),
      date: ticket.date,
      section: ticket.section,
      row: ticket.row,
      seat: parseInt(ticket.seat),
      price: parseFloat(ticket.price),
      email: honeyUserObject.email,
    };

    fetch("http://localhost:8088/tickets?_expand=show&_expand=user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/tickets"); // Navigate to the desired route
      })
      .catch((error) => {
        console.error("Error submitting ticket:", error);
        // Perform error handling or show an error message
      });

      
    // Reset the form
    setTicket({
      id: "",
      showId: "",
      date: "",
      section: "",
      row: "",
      seat: "",
      price: "",
      email: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Submit a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="showId">Show ID:</label>
        <select id="showId" name="showId" value={ticket.showId} onChange={handleChange}>
          <option value="">Select a show</option>
          {shows.map((show) => (
            <option value={show.id} key={show.id}>
              {show.city} - {show.date}
            </option>
          ))}
        </select>

        <label htmlFor="section">Section:</label>
        <input
          type="text"
          id="section"
          name="section"
          value={ticket.section}
          onChange={handleChange}
        />

        <label htmlFor="row">Row:</label>
        <input
          type="text"
          id="row"
          name="row"
          value={ticket.row}
          onChange={handleChange}
        />

        <label htmlFor="seat">Seat:</label>
        <input
          type="number"
          id="seat"
          name="seat"
          value={ticket.seat}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={ticket.price}
          onChange={handleChange}
        />

        <label htmlFor="email">User E-mail:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={honeyUserObject.email}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


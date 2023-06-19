import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TicketEditor } from "./TicketEdit.js";

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
  
    const [editingTicketId, setEditingTicketId] = useState(null);
  
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
  
    useEffect(() => {
      if (editingTicketId) {
        // Fetch the ticket details based on the editingTicketId
        fetch(`http://localhost:8088/tickets/${editingTicketId}`)
          .then((response) => response.json())
          .then((ticketData) => {
            setTicket(ticketData);
          });
      }
    }, [editingTicketId]);
  
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
  
      if (editingTicketId) {
        // Update the ticket data
        fetch(`http://localhost:8088/tickets/${editingTicketId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ticketToSendToAPI),
        })
          .then((response) => response.json())
          .then(() => {
            setEditingTicketId(null);
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
            navigate("/tickets");
          })
          .catch((error) => {
            console.error("Error updating ticket:", error);
            // Perform error handling or show an error message
          });
      } else {
        // Create a new ticket
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
      }
    };
  
    const handleEdit = (ticketId) => {
      setEditingTicketId(ticketId);
    };
  
    const handleDelete = (ticketId) => {
      // Perform any necessary cleanup or updates after deleting a ticket
      // For example, you may want to refresh the list of tickets
      // by fetching the latest data from the server.
      console.log("Ticket deleted:", ticketId);
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
          <select
            id="showId"
            name="showId"
            value={ticket.showId}
            onChange={handleChange}
          >
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
  
          <button type="submit">
            {editingTicketId ? "Update" : "Submit"}
          </button>
        </form>
  
        {honeyUserObject.email && (
          <TicketEditor
            userEmail={honeyUserObject.email}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    );
  };
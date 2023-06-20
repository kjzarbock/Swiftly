import React, { useState, useEffect } from "react";

export const TicketEditor = ({ userEmail, onEdit, onDelete }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/tickets?email=${userEmail}`)
      .then((response) => response.json())
      .then((ticketArray) => {
        setTickets(ticketArray);
      });
  }, [userEmail]);

  const handleDelete = (ticketId) => {
    fetch(`http://localhost:8088/tickets/${ticketId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTickets((prevTickets) =>
          prevTickets.filter((ticket) => ticket.id !== ticketId)
        );
        onDelete(ticketId);
      })
      .catch((error) => {
        console.error("Error deleting ticket:", error);
        // Perform error handling or show an error message
      });
  };
  

  return (
    <div>
      <h2>Edit Tickets</h2>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket.id}>
              Ticket ID: {ticket.id}
              {/* Render other ticket details here */}
              <button onClick={() => onEdit(ticket.id)}>Edit</button>
              {userEmail === ticket.email && (
                <button onClick={() => handleDelete(ticket.id)}>Delete</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets found for editing.</p>
      )}
    </div>
  );
};
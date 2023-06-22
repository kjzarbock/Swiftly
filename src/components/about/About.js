import React, { useEffect, useState } from "react";
import "./About.css";
import { ContactForm } from "./AboutEmail.js";

export const About = () => {
  const [messages, setMessages] = useState([]);
  const localSwiftlyUser = localStorage.getItem("swiftly_user");
  const swiftlyUserObject = JSON.parse(localSwiftlyUser);

  useEffect(() => {
    if (swiftlyUserObject && swiftlyUserObject.staff === true) {
      fetch("http://localhost:8088/messages")
        .then((response) => response.json())
        .then((messageArray) => {
          setMessages(messageArray);
        })
        .catch((error) => {
          console.error("Error retrieving messages:", error);
        });
    }
  }, []);

  const handleDeleteMessage = (messageId) => {
    fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message.id !== messageId)
        );
        console.log("Message deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  };

  return (
    <div className="home-container">
      <div className="image-container">
        <a href="https://imgur.com/GpltUil">
          <img src="https://i.imgur.com/GpltUil.jpg" alt="Katie" title="source: imgur.com" />
        </a>
      </div>
      <div className="text-container">
        <h2>About Us!</h2>
        <p>
          Introducing Katie, the self-proclaimed queen of Taylor Swift fandom, whose entire
          existence revolves around her idol. Prepare to witness the astonishing sight of a
          person who has transformed Taylor Swift into their sole personality trait. From
          morning to night, Katie's life is a meticulously crafted homage to Taylor. Her room is
          a shrine filled with posters, albums, and an array of Taylor Swift merchandise that
          would make any Swiftie blush. Every conversation with Katie is an opportunity for
          her to weave Taylor's lyrics into everyday mundane topics, as if life's problems can
          be solved with a clever line from "Love Story." Katie's social media presence is a
          dizzying display of Taylor Swift quotes, concert throwbacks, and unyielding
          declarations of love for the pop star. While some might question the extent of her
          obsession, Katie proudly wears her title of Taylor Swift's biggest fan like a crown. So,
          brace yourselves for a glimpse into the life of Katie, where Taylor Swift reigns
          supreme and the world is but a stage for her endless adoration.
        </p>
        
        {swiftlyUserObject && swiftlyUserObject.staff && messages.length > 0 && (
          <div>
            <h3>Messages:</h3>
            <ul>
              {messages.map((message) => (
                <li key={message.id} className="message">
                  <strong>From:</strong>{" "}
                  <a href={`mailto:${message.email}`}>{message.email}</a>
                  <br />
                  <strong>Message:</strong> {message.message}
                  {swiftlyUserObject.staff && (
                    <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        <ContactForm />
      </div>
    </div>
  );
};





import React, { useState } from "react";

export const ContactForm = () => {
  const localSwiftlyUser = localStorage.getItem("swiftly_user");
  const swiftlyUserObject = JSON.parse(localSwiftlyUser);
  const userEmailAddress = swiftlyUserObject?.email || "";
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [name, setName] = useState("");
  const [email] = useState(userEmailAddress);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); // New state variable

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      message: message,
    };

    fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully:", data);
        setName("");
        setMessage("");
        setIsSubmitted(true); // Update isSubmitted state to true
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  return (
    <div>
      <h2>Contact Us</h2>
      {isSubmitted ? (
        <p>Message sent successfully!</p>
      ) : null}
      <form onSubmit={handleSubmit} className={isDarkMode ? "dark-mode" : ""}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          readOnly
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};







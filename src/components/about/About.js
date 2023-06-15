import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { ContactForm } from "./AboutEmail.js";

export const About = () => {
    return (
        <div className="home-container">
            <div className="image-container">
                <a>
                    <img src="https://i.imgur.com/GpltUil.jpg" alt="Katie" />
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
                <ContactForm />
            </div>
        </div>
    );
};

<a href="https://imgur.com/GpltUil"><img src="https://i.imgur.com/GpltUil.jpg" title="source: imgur.com" /></a>
import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://frontendexesportapp-l2drnxcsl-nuttapatp.vercel.app/email/",
        {
          email,
        }
      );
      if (response.status === 200 || response.status === 201) {
        alert("Email submitted successfully!");
        setEmail("");
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error saving email:", error);
      if (error.response && error.response.status === 500) {
        alert(
          "The provided email is already registered. Please try a different email."
        );
      } else {
        alert("Error saving email. Please try again.");
      }
    }
  };

  return (
    <div className="news-letter">
      <div className="news-details">
        <span className="news-line1">Sing Up For Newsletters</span>
        <span className="news-line2">
          Get E-mail updates about our latest shop and{" "}
          <div style={{ color: "yellow", display: "inline" }}>
            special offers.
          </div>
        </span>
      </div>

      <div className="sending-email">
        <form onSubmit={sendEmail}>
          <input
            type="email"
            placeholder="Enter your email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Categorybar from "./Categorybar";
import "./signup.css"; 

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3000/customer/", {
        name,
        email,
        password,
      });
      console.log(result);
      navigate("/login"); // Use the navigate function to navigate
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <Navbar />
        <div className="searchbar-sticky-container">
          <Searchbar />
          <Categorybar />     
      </div>
      <div className="background-container">
        <div className="signup-container">
          <div className="signup-account">
            <h3>SIGN UP</h3>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="name"
              className="input-field"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              name=""
              id=""
            />

            <input
              type="email"
              className="input-field"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              name=""
              id=""
            />
            <input
              type="password"
              className="input-field"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              name=""
              id=""
            />

            <button type="submit" className="signup-button">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import "./nav.css"
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "..//../components/context/UserContext";
export default function Navbar() {
  const contactRef = useRef(null);
  const { user } = useUser();
  const handleContactClick = () => {
    contactRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const { setUser } = useUser();
  const navigate = useNavigate();

const handleLogout = () => {
  // Clear user from context
  setUser(null);

  // Clear the entire local storage
  localStorage.clear();

  // Redirect to homepage
  navigate("/");
};

  
  return (
    <div className="nav-bar">
      <div className="nav-button-saving">
        <Link to="/signup">
          <button className="nav-button">SIGN UP & GET DISCOUNT CODE</button>
        </Link>
      </div>
      <div className="nav-menu">
        <Link to="/">Home</Link>

        {user ? (
          <div className="user-dropdown">
            <span className="user-welcome">Welcome, {user.name}!</span>
            <div className="dropdown-content">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}

        <Link to="/cart">Cart</Link>
      
        <Link to="#" onClick={handleContactClick}>
          Contact
        </Link>
      </div>
      <div style={{ marginTop: "3500px" }}>
        <div ref={contactRef}></div>
      </div>
    </div>
  );
}


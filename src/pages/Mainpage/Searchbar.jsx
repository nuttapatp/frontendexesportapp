
import { useState } from "react";
import React from 'react'
import logo from "../../assets/images/exesport.png"
import "./searchbar.css";
import { Link } from "react-router-dom";

export default function Searchbar() {
    const [searchQuery, setSearchQuery] = useState("");

 const handleSearch = (e) => {
   e.preventDefault();
   if (searchQuery.trim() !== "") {
     window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
   }
 };
    


  return (
    <div className="Search-container">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Image" className="main-background" />
        </Link>
    
      </div>
      <div className="box-container">
        <form className="form-container">
          <input
            type="text"
            placeholder="Search..."
            className="input-form"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link
            to={`/search?q=${encodeURIComponent(searchQuery)}`}
            className="button-form"
          >
            <i className="fa fa-search icon-form" aria-hidden="true"></i>
          </Link>
        </form>
      </div>
    </div>
  );
}



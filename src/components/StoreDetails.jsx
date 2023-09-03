import React from "react";
import { Link } from "react-router-dom";
import "./storedetails.css";
import Newsletter from "./Newsletter";
const StoreDetails = ({
  logo1,
  logo2,
  logo3,
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
}) => {
  return (
    <>
      <div className="store-option">
        <div className="logo-list">
          <div className="logo-container">
            <img src={logo1} alt="Image" className="logo-image" />
            <p>FREE DELIVERY</p>
          </div>
          <div className="logo-container">
            <img src={logo2} alt="Image" className="logo-image" />
            <p>NEW ARRIVAL SHOES</p>
          </div>
          <div className="logo-container">
            <img src={logo3} alt="Image" className="logo-image" />
            <p>ORIGINAL GUARANTEE</p>
          </div>
          <div className="logo-container">
            <img src={logo4} alt="Image" className="logo-image" />
            <p>BEST SHOE STORE</p>
          </div>
          <div className="logo-container">
            <img src={logo5} alt="Image" className="logo-image" />
            <p>ORDER RETURN</p>
          </div>
        </div>
      </div>

      <Newsletter />

      <div className="last-page">
        <div className="my-account">
          <div className="line1">My account</div>
          <Link to="/login" className="line2">
            My account
          </Link>
        </div>
        <div className="my-order">
          <div className="line1">Orders</div>
          <div className="line2">My Delivery</div>
          <Link to="/sizepage" className="line3">
            Sizing
          </Link>
        </div>
        <div className="customer-service">
          <div className="line1">Customer Service</div>
          <div className="line2">Contact Us</div>
          <div className="line3">FAQs</div>
        </div>
        <div className="app-download">
          <div className="line1">Application Download</div>
          <a href="https://www.apple.com/app-store/">
            <img src={logo6} alt="Image" className="app-download-logo" />
          </a>
          <a href="https://play.google.com/store/">
            <img src={logo7} alt="Image" className="app-download-logo" />
          </a>
        </div>
        <div className="contact-us">
          <div className="contact-header">FOLLOW US</div>
          <span className="follow-container">
            <img src={logo8} alt="Image" className="contact-logo" />
            <img src={logo9} alt="Image" className="contact-logo" />
            <img src={logo10} alt="Image" className="contact-logo" />
            <img src={logo11} alt="Image" className="contact-logo" />
          </span>
        </div>
      </div>
    </>
  );
};

export default StoreDetails;

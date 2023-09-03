import "./sizepage.css";
import React from "react";

import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

import Categorybar from "./Categorybar";
import StoreDetails from "../../components/StoreDetails";
import imagesizemen from "../../assets/size/Sizechart-Men-Shoes.jpg";
import imagesizewomen from "../../assets/size/Sizechart-Women-Shoes.jpg";

import logo1 from "../../assets/logo/free delivery.png";
import logo2 from "../../assets/logo/Shoe.png";
import logo3 from "../../assets/logo/guard.png";
import logo4 from "../../assets/logo/store.png";
import logo5 from "../../assets/logo/order return.png";
import logo6 from "../../assets/logo/app_store_badge.png";
import logo7 from "../../assets/logo/google_play_store.png";
import logo8 from "../../assets/logo/instragram.png";
import logo9 from "../../assets/logo/line.png";
import logo10 from "../../assets/logo/facebook.png";
import logo11 from "../../assets/logo/messenger.png";

export default function Sizepage() {
  return (
    <div>
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar />
      </div>
      <div className="sizepage-container">
        <img src={imagesizemen} alt="Size Chart for Men" />
        <img src={imagesizewomen} alt="Size Chart for Women" />
      </div>
      <StoreDetails
        logo1={logo1}
        logo2={logo2}
        logo3={logo3}
        logo4={logo4}
        logo5={logo5}
        logo6={logo6}
        logo7={logo7}
        logo8={logo8}
        logo9={logo9}
        logo10={logo10}
        logo11={logo11}
      />
    </div>
  );
}
import React from "react";
import Slider from "react-slick"; 

import Navbar from "./Navbar";
import Searchbar from "./Searchbar"; 
import Categorybar from "./Categorybar";

import StoreDetails from "../../components/StoreDetails";
import imageflash1 from "../../assets/sale/addidas ultraboost.jpg";
import imageflash2 from "../../assets/sale/Screenshot 2023-09-01 114859.png";
import imageflash3 from "../../assets/sale/new-balance.jpg";

import imagenew1 from "../../assets/sale/new-arrival-nike.jpg";
import imagenew2 from "../../assets/sale/adidas-predetor.jpg";
import imagenew3 from "../../assets/sale/puma-king.jpg";

import gif1 from "../../assets/sale/new-arrival-adidas2.gif";

import logo1 from "../../assets/logo/free delivery.png";
import logo2 from "../../assets/logo/Shoe.png";
import logo3 from "../../assets/logo/guard.png";
import logo4 from "../../assets/logo/store.png";
import logo5 from "../../assets/logo/order return.png";
import logo6 from "../../assets/logo/app_store_badge.png"
import logo7 from "../../assets/logo/google_play_store.png"
import logo8 from "../../assets/logo/instragram.png"
import logo9 from "../../assets/logo/line.png"
import logo10 from "../../assets/logo/facebook.png"
import logo11 from "../../assets/logo/messenger.png"

import "./home.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Homepage = () => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar />
      </div>

      <div className="flash-sale-container">
        <span className="flash-sale-line"></span>
        <span className="flash-sale-text">FLASH SALE</span>
        <span className="flash-sale-line"></span>
      </div>
      <Slider {...sliderSettings}>
        <div>
          <a href=
          // "https://frontendexesportapp.vercel.app/singleproduct/64f2cd91a98d3d800c113ba6"
          "`http://localhost:3000/singleproduct/64f2cd91a98d3d800c113ba6"
          >
            <img src={imageflash1} alt="Image 1" className="main-background" />
          </a>
        </div>
        <div>
          <a href="https://frontendexesportapp.vercel.app/singleproduct/64f2e134a98d3d800c113dc8">
            <img src={imageflash2} alt="Image 2" className="main-background" />
          </a>
        </div>
        <div>
          <a href="https://frontendexesportapp.vercel.app/singleproduct/64f2ea5b5b377956bc859541">
            <img src={imageflash3} alt="Image 3" className="main-background" />
          </a>
        </div>
      </Slider>

      <div className="flash-sale-container">
        <span className="flash-sale-line"></span>
        <span className="flash-sale-text">NEW ARRIVAL SHOES</span>
        <span className="flash-sale-line"></span>
      </div>
      <div className="new-arrival">
        <div className="arrival-content">
          <Slider {...sliderSettings}>
            <div>
              <a href="https://frontendexesportapp.vercel.app/singleproduct/64f2d1c9a98d3d800c113ccd">
                <img src={imagenew1} alt="Image" className="main2-background" />
              </a>
            </div>
            <div>
              <a href="https://frontendexesportapp.vercel.app/singleproduct/64f2c834a98d3d800c113af1">
                <img src={imagenew2} alt="Image" className="main2-background" />
              </a>
            </div>
            <div>
              <a href="https://frontendexesportapp.vercel.app/singleproduct/64f2e777a98d3d800c113e86">
                <img src={imagenew3} alt="Image" className="main2-background" />
              </a>
            </div>
          </Slider>

          <div>
            <a href="https://frontendexesportapp.vercel.app/singleproduct/64f2c8ffa98d3d800c113af7">
            {/* <a href="http://localhost:3001/singleproduct/64f2c8ffa98d3d800c113af7"> */}
              <img src={gif1} alt="GIF" className="new-arrival-gif" />
            </a>
          </div>
        </div>
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
    </>
  );
};

export default Homepage;

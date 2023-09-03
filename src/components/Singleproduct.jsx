import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../pages/Mainpage/Navbar";
import Searchbar from "../pages/Mainpage/Searchbar";
import "./singleproduct.css"; 

import StoreDetails from "./StoreDetails";
import Newsletter from "./Newsletter";
import logo1 from "./../assets/logo/free delivery.png";
import logo2 from "./../assets/logo/Shoe.png";
import logo3 from "./../assets/logo/guard.png";
import logo4 from "./../assets/logo/store.png";
import logo5 from "./../assets/logo/order return.png";
import logo6 from "./../assets/logo/app_store_badge.png";
import logo7 from "./../assets/logo/google_play_store.png";
import logo8 from "./../assets/logo/instragram.png";
import logo9 from "./../assets/logo/line.png";
import logo10 from "./../assets/logo/facebook.png";
import logo11 from "./../assets/logo/messenger.png";
import Categorybar from "../pages/Mainpage/Categorybar";



export default function SingleProduct() {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0); // Selected image index

  useEffect(() => {
    // Fetch detailed information about the shoe using the API
    fetch(
      `https://frontendexesportapp-l2drnxcsl-nuttapatp.vercel.app/singleproduct/${id}`
    )
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Map the _id to shoe.id
        const modifiedData = { ...data, id: data._id };
        setShoe(modifiedData);
      })
      .catch((error) => console.error(error));
  }, [id]);

  if (!shoe) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleSizeButtonClick = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    if (!shoe) {
      alert("Shoe details are still loading. Please wait.");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const ordernumber = cartItems.length + 1; // Generate unique order number
    const cartItem = {
      ordernumber,
      id: shoe.id,
      size: selectedSize,
      quantity: quantity,
    };

    console.log("cartItem:", cartItem);

    const updatedCartItems = [...cartItems, cartItem];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    alert("Item added to cart!");
  };

  const productImages = [
    shoe.product_image,
    shoe.product_image2,
    shoe.product_image3,
    shoe.product_image4,
  ].filter(Boolean); // To remove any null or undefined values

  const handleImageChange = (direction) => {
    if (direction === "up" && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    } else if (
      direction === "down" &&
      selectedImage < productImages.length - 1
    ) {
      setSelectedImage(selectedImage + 1);
    }
  };




  return (
    <div className="single-product-container">
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar />
      </div>
      <div className="history-bar">
        <a
          href={`https://frontendexesportapp-l2drnxcsl-nuttapatp.vercel.app/brands/${shoe.brand_name}`}
        >
          {shoe.brand_name}
        </a>
        <span>&gt;</span>
        <a
          href={`https://frontendexesportapp-l2drnxcsl-nuttapatp.vercel.app/type/${shoe.prod_type}`}
        >
          {shoe.prod_type}
        </a>
        <span>&gt;</span>

        {shoe.prod_name}
      </div>

      <div className="product-single">
        {shoe.new_arrival && <span className="new-banner">New</span>}

        <div className="product-image-container">
          <img
            src={productImages[selectedImage]}
            alt={shoe.prod_name}
            className="product-image"
          />

          <div className="image-change-controls">
            <button onClick={() => handleImageChange("up")}>Up</button>
            <button onClick={() => handleImageChange("down")}>Down</button>
          </div>
        </div>

        <div className="vertical-thumbnail-bar">
          {productImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Thumbnail ${index}`}
              className={`thumbnail-image ${
                selectedImage === index ? "active" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>

        <div className="product-details">
          <div className="brand-name">
            {shoe.brand_name === "NEWBALANCE" ? "NEW BALANCE" : shoe.brand_name}
          </div>
          <div className="product-name">{shoe.prod_name}</div>

          {shoe.on_sale ? (
            <>
              <div className="product-price strikethrough">
                ฿ {shoe.prod_price}
              </div>
              <div className="sale-price">Sale: ฿ {shoe.sale_price}</div>
            </>
          ) : (
            <div className="product-price">฿ {shoe.prod_price}</div>
          )}

          <p className="product-des"> {shoe.prod_desc}</p>

          <div className="product-buy">
            <div className="flex-container">
              <div className="column">
                <div className="size-options">
                  <div className="size-label">
                    Size <span className="size-result"> {selectedSize}</span>
                  </div>

                  <div className="size-button-container">
                    <button
                      className={`size-button ${
                        selectedSize === "UK 7" ? "selected" : ""
                      }`}
                      onClick={() => handleSizeButtonClick("UK 7")}
                    >
                      UK 7
                    </button>
                    <button
                      className={`size-button ${
                        selectedSize === "UK 8" ? "selected" : ""
                      }`}
                      onClick={() => handleSizeButtonClick("UK 8")}
                    >
                      UK 8
                    </button>
                    <button
                      className={`size-button ${
                        selectedSize === "UK 9" ? "selected" : ""
                      }`}
                      onClick={() => handleSizeButtonClick("UK 9")}
                    >
                      UK 9
                    </button>
                    <button
                      className={`size-button ${
                        selectedSize === "UK 10" ? "selected" : ""
                      }`}
                      onClick={() => handleSizeButtonClick("UK 10")}
                    >
                      UK 10
                    </button>
                    <button
                      className={`size-button ${
                        selectedSize === "UK 11" ? "selected" : ""
                      }`}
                      onClick={() => handleSizeButtonClick("UK 11")}
                    >
                      UK 11
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-container">
              <div className="column">
                <div className="quantity-input">
                  <span>Quantity :</span>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
              </div>

              <div className="column">
                <div className="product-buy-cast">
                  <button
                    className="add-to-cart-button"
                    onClick={handleAddToCartClick}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
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
    </div>
  );
}

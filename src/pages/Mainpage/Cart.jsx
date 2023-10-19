import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Categorybar from "./Categorybar";
import "./cart.css";
import StoreDetails from "..//..//components/StoreDetails";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";


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

export default function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log("cartItems:", cartItems); // Add this line to log cartItems
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Assume the user is not logged in by default
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);


  
  

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = {};

      await Promise.all(
        cartItems.map(async (item) => {
          if (item.id && !details[item.id]) {
            const response = await fetch(
              `https://backendexesportapp-93e0c67ee387.herokuapp.com/singleproduct/${item.id}`
              // `http://localhost:3000/singleproduct/${item.id}`
            );
            const data = await response.json();
            details[item.id] = data;
          }
        })
      );
              console.log("Fetched product details:", details);

      setProductDetails(details);
      setIsLoading(false);
    };

    fetchProductDetails();
  }, []); 

  const calculateTotal = (item) => {
    if (productDetails[item.id]) {
      const price = productDetails[item.id].on_sale
        ? productDetails[item.id].sale_price
        : productDetails[item.id].prod_price;
      const quantity = item.quantity;
      return price * quantity;
    }
    return 0;
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + calculateTotal(item),
    0
  );

  const removeFromCart = (ordernumber) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.ordernumber !== ordernumber
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setProductDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      delete updatedDetails[ordernumber];
      return updatedDetails;
    });
  };
const handleOrder = () => {
  if (!isLoggedIn) {
    alert("Please login before proceeding with your order.");
    return;
  }

  setShowCheckoutModal(true);
};



useEffect(() => {
  const userToken = localStorage.getItem("userToken");

  console.log("Checking userToken:", userToken);

  if (userToken) {
    setIsLoggedIn(true);
    console.log("User is logged in.");
  } else {
    console.log("User is not logged in.");
  }
}, []);


  return (
    <div>
      {/* {redirectToCheckout && <Redirect to="/checkout" />} */}
      <Navbar />
      <div className="searchbar-sticky-container">
        <Searchbar />
        <Categorybar />
      </div>
      {/* <button onClick={handleClearLocalStorage}>Clear Local Storage</button> */}
      <h2 className="header-cart">Cart ({cartItems.length} items)</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <div className="cart-all">
          <div className="cart-content">
            <ul>
              <div className="cart-product-grid">
                {cartItems.map((item) =>
                  productDetails[item.id] ? (
                    <li key={item.ordernumber} className="cart-item">
                      <img
                        src={productDetails[item.id].product_image}
                        alt={productDetails[item.id].prod_name}
                      />
                      <div className="cart-item-details">
                        <div className="left-details">
                          <p className="detail-item-brand">
                            {productDetails[item.id].brand_name}
                          </p>
                          <p>{productDetails[item.id].prod_name}</p>
                          <p>
                            {productDetails[item.id].on_sale ? (
                              <>
                                <span className="strikethrough">
                                  ฿{productDetails[item.id].prod_price}
                                </span>{" "}
                                <span className="sale-price-size">
                                  ฿{productDetails[item.id].sale_price}
                                </span>
                              </>
                            ) : (
                              productDetails[item.id].prod_price
                            )}
                          </p>

                          <p>Size : {item.size}</p>
                        </div>
                        <div className="right-details">
                          <p>Quantity: {item.quantity}</p>
                          <p className="cart-item-total">
                            Total : ฿{calculateTotal(item)}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.ordernumber)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ) : null
                )}
              </div>
            </ul>
          </div>
          <div />
          <div className="cart-summary">
            <div className="summary-total">
              <h3>Summary Total</h3>
              <p className="summary-total-item">
                Total Items : {cartItems.length}
              </p>
              <p className="summary-total-grand">Grand Total : {totalAmount}</p>

              <button
                onClick={handleOrder}
                className="order-button"
                disabled={cartItems.length === 0}
              >
                Checkout
              </button>
            </div>
          </div>
          {showCheckoutModal && (
            <div className="checkout-modal">
              <div className="checkout-modal-content">
            
                <Checkout showModalVersion={true} />
                  <p className="checkout-total-amount">
                  Grand Total: ฿{totalAmount}
                </p>
                <button onClick={() => setShowCheckoutModal(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./checkout.css";

const Checkout = ({ showModalVersion = false }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load cart items from local storage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  useEffect(() => {
    // Fetch product details for each item in the cart
    Promise.all(
      cartItems.map((item) =>
        axios.get(
          // `http://localhost:3000/singleproduct/${item.id}`
          `https://backendexesportapp-93e0c67ee387.herokuapp.com/singleproduct/${item.id}`
        )
      )
    ).then((responses) => {
      const fetchedProducts = responses.map((res) => res.data);
      setProducts(fetchedProducts);
    });
  }, [cartItems]);


  
  const handleCheckout = async () => {
    console.log("Sending products data:", JSON.stringify(products));
    console.log("Sending products data:", JSON.stringify(products.prod_name));

    

    const refinedProducts = products.map((product) => {
      const associatedCartItem = cartItems.find(
        (item) => item.id === product._id
      );
      const price = product.on_sale ? product.sale_price : product.prod_price;
      return {
        prod_name: product.prod_name,
        product_image: product.product_image,
        prod_price: price,
        quantity: associatedCartItem ? associatedCartItem.quantity : 1,
        size: associatedCartItem ? associatedCartItem.size : "N/A", // Adding size here
      };
    });

    try {
      console.log("Refined products:", refinedProducts);

      const response = await fetch(
        // "http://localhost:4242/server-route/create-checkout-session",
        "https://backendendexesportapp-90771f5053d5.herokuapp.com/server-route/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(refinedProducts), // Send the products data
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server responded with: ${errorText}`);
      }

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url; 
      } else {
        console.error("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Error during checkout:", error.message);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return (
    <div className="checkout-container">
      {(showModalVersion = false)}
      {message ? (
        <p>{message}</p>
      ) : (
        <div>
          <h3 className="checkout-heading">Checkout</h3>
          <ul className="checkout-list">
            {products.map((product, index) => (
              <li key={product._id} className="checkout-item">
                <img src={product.product_image} alt={product.prod_name} />
                <div className="product-info">
                  <p className="product-name-checkout">{product.prod_name}</p>
                  Price:{" "}
                  {product.on_sale ? product.sale_price : product.prod_price}
                  <p className="product-quantity">
                    Quantity: {cartItems[index].quantity}
                  </p>
                  <p className="product-size">Size: {cartItems[index].size}</p>
                </div>
              </li>
            ))}
          </ul>

          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

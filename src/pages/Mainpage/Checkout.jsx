import React, { useState, useEffect } from "react";

const ProductDisplay = ({ cartItems, productDetails, totalAmount }) => (
  <section>
    <div className="product">
      <h3>Your Cart</h3>
      <ul>
        {cartItems.map(
          (item) =>
            productDetails[item.id] && (
              <li key={item.id}>
                <img
                  src={productDetails[item.id].product_image}
                  alt={productDetails[item.id].prod_name}
                />
                <p>{productDetails[item.id].prod_name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
                <p>Price: {productDetails[item.id].prod_price}</p>
              </li>
            )
        )}
      </ul>
      <h3>Total Amount: ${totalAmount}</h3>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const [productDetails, setProductDetails] = useState({});

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

  useEffect(() => {
    const fetchProductDetails = async () => {
      const details = {};

      await Promise.all(
        cartItems.map(async (item) => {
          if (item.id && !details[item.id]) {
            const response = await fetch(
              `https://backendexesportapp-93e0c67ee387.herokuapp.com/singleproduct/${item.id}`
            );
            const data = await response.json();
            details[item.id] = data;
          }
        })
      );
      console.log("Fetched product details:", details);
      setProductDetails(details);
        

    };

    fetchProductDetails();
  }, [cartItems]);

  const totalAmount = cartItems.reduce((total, item) => {
    if (productDetails[item.id]) {
      const price = productDetails[item.id].on_sale
        ? productDetails[item.id].sale_price
        : productDetails[item.id].prod_price;
      return total + price * item.quantity;
    }
    return total;
  }, 0);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay
      cartItems={cartItems}
      productDetails={productDetails}
      totalAmount={totalAmount}
    />
  );
}
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useEffect,useState } from "react";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const currentUserId = localStorage.getItem("userId");


  useEffect(() => {
    if (!selectedOrder) return;

    const fetchTotalAmount = async () => {
      const responseOrder = await fetch(
        `https://backendexesportapp-93e0c67ee387.herokuapp.com/orders/${selectedOrder._id}`
      );
      const orderData = await responseOrder.json();

      let calculatedAmount = 0;
      for (const item of orderData.items) {
        const responseProduct = await fetch(
          `https://backendexesportapp-93e0c67ee387.herokuapp.com/singleproduct/${item.productId}`
        );
        const productData = await responseProduct.json();
        calculatedAmount += productData.prod_price * item.quantity;
      }
      setTotalAmount(calculatedAmount);
    };

    fetchTotalAmount();
  }, [selectedOrder]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const response = await fetch(
      "https://backendexesportapp-93e0c67ee387.herokuapp.com/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }), // Send the calculated amount to the backend
      }
    );

    if (!response.ok) {
      console.error("Error when creating payment intent");
      return;
    }

    const { clientSecret } = await response.json();

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentResult.error) {
      console.error(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        console.log("Payment successful!");
      }
    }
  };

  useEffect(() => {
    // Assuming currentUserId is available in this component
    fetch("https://backendexesportapp-93e0c67ee387.herokuapp.com/orders/")
      .then((response) => response.json())
      .then((data) => {
        const userOrders = data.filter(
          (order) => order.userId === currentUserId
        );
        setOrders(userOrders);
      });
  }, [currentUserId]);

  return (
    <div>
      <h2>Select an Order to Pay For</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <button onClick={() => setSelectedOrder(order)}>
              Order {order._id}
            </button>
          </li>
        ))}
      </ul>

      <h2>Checkout</h2>
      <p>Total Amount: ${totalAmount}</p>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </div>
  );
}

export default CheckoutForm;

import React from "react";
import { UserProvider } from "../src/components/context/UserContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";




import Homepage from "./pages/Mainpage/Homepage";
import SingleProduct from './components/Singleproduct.jsx';
import Signup from './pages/Mainpage/Signup';
import Cart from './pages/Mainpage/Cart'
import Categorybar from "./pages/Mainpage/Categorybar";
import Shoelist from "./pages/Mainpage/Shoelist";
import Search from "./pages/Mainpage/Search";
import Login from "./pages/Mainpage/Login";
import Typeshoe from "./components/Typeshoe.jsx";
import Sizepage from "./pages/Mainpage/Sizepage.jsx";
import Payment from "./components/Payment.jsx"

const stripePromise = loadStripe(
  "pk_test_51Nx8oJGZMu4IjZdEMDMqhvnhXj1noVvzPXvT36PYZX20lqcQhtFTAFJ0XecDzqu5uDHNNJi25hWlq96GpQ20Kgeh00B0xBAWlO"
);


function App() {
  return (
    <div className="App">
      <UserProvider>
        <Elements stripe={stripePromise}>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/category" element={<Categorybar />} />
              <Route path="/singleproduct/:id" element={<SingleProduct />} />
              {/* <Route path="/search/singleproduct/:id" element={SingleProduct} /> */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/brands/:brandName" element={<Shoelist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/type/:typeName" element={<Typeshoe />} />
              <Route path="/sizepage" element={<Sizepage />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </Router>
        </Elements>
      </UserProvider>
    </div>
  );
}

export default App;

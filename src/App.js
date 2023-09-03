import React from "react";
import { UserProvider } from "../src/components/context/UserContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


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


function App() {
  return (
    <div className="App">
      <UserProvider>
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
 
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

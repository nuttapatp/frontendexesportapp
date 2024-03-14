import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import "./login.css"
import Navbar from './Navbar';
import Categorybar from './Categorybar';
import Searchbar from './Searchbar';
import { useUser } from "..//../components/context/UserContext";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const [showWarning, setShowWarning] = useState(false);
  const { setUser } = useUser();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const customers = await axios.get(
        "https://backendendexesportapp-90771f5053d5.herokuapp.com/customer/"
        // "http://localhost:3000/customer"
      );
      const foundUser = customers.data.find(
        (user) => user.email === email && user.password === password
      );

    if (foundUser) {
      console.log("Login successful");
      localStorage.setItem("userToken", "sampleToken");
      localStorage.setItem("userId", foundUser._id); 
      localStorage.setItem("userEmail", foundUser.email);

         localStorage.setItem("userData", JSON.stringify(foundUser));
      
      setUser(foundUser);
      setShowWarning(false);
      navigate("/");
    } else {
      console.log("Login failed");
        setShowWarning(true);
      }
    } catch (error) {
      console.error(error);
      setShowWarning(true);
    }
    

  };  

  


 return (
   <div>
     <Navbar />
     <div className="searchbar-sticky-container">
       <Searchbar />
       <Categorybar />
     </div>
     <div className="background-container">
       <div className="login-container">
         <h3> LOG IN </h3>
         <form onSubmit={handleSubmit}>
           <div className="login-account">
             <span>
               Not a member yet? <Link to="/signup">CREATE ACCOUNT</Link>
             </span>
           </div>
           <input
             type="email"
             onChange={(e) => {
               setEmail(e.target.value);
             }}
             className="input-field"
             placeholder="Email"
             name=""
             id=""
           />
           {showWarning && (
             <p className="warning-text">
               Invalid email or password. Please try again.
             </p>
           )}

           <input
             type="password"
             onChange={(e) => {
               setPassword(e.target.value);
             }}
             className="input-field"
             placeholder="Password"
             name=""
             id=""
           />

           <button type="submit" className="login-button">
             Login
           </button>
         </form>
       </div>
     </div>
   </div>
 );
}
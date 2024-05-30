import React, { useState } from "react";
import css from "./Login.module.css"; // Import CSS module for styling
import logo from "../../../assets/Images/fb-icon.webp"; // Import Facebook icon image
import img from "../../../assets/Images/google-icon.webp"; // Import Google icon image
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import { validate } from 'email-validator'; // Import email validation library

function Login() {
  const [userEmail, setUseremail] = useState(''); // State for user email input
  const navigate = useNavigate(); // Navigation hook for routing
  const email = localStorage.getItem('userEmail'); // Get user email from localStorage

  // Function to handle user input change in email field
  const handleInput = (e) => {
    setUseremail(e.target.value);
  };

  // Function to add user and navigate based on email validation
  const addUser = () => {
    if (validate(userEmail)) { // Validate user email
      if (email === userEmail) { // Check if email already exists in localStorage
        navigate('/loginpage'); // Navigate to login page if email exists
      } else {
        localStorage.setItem("userEmail", userEmail); // Set user email in localStorage
        navigate('/registerpage'); // Navigate to register page if email is new
      }
    } else {
      alert("Please enter a valid email address"); // Alert for invalid email format
    }
  };

  return (
    <div className={css.card}>
      <h1 className={css.header}>Welcome to AJIO</h1>
      <p>Join/Sign In using</p>
      <div className={css.icons}>
        <div className={css.facebook}>
          <img src={logo} alt="facebook" />
          <p>FACEBOOK</p>
        </div>
        <div className={css.google}>
          <img src={img} alt="google" />
          <p>GOOGLE</p>
        </div>
      </div>

      <form>
        <label className={css.label}>Enter Email</label>
        <input
          className={css.input}
          type="text"
          value={userEmail}
          onChange={handleInput}
        />      
      </form>
      
      <button className={css.continue} onClick={addUser}>
        CONTINUE
      </button>
      
      <p className={css.lastline}>
        By Signing In, I agree to the <a href="">Terms and Conditions</a>
      </p>
    </div>
  );
}

export default Login;

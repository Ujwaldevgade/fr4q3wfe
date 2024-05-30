import React, { useEffect } from "react";
import css from "./RegisterPage.module.css"; // Import CSS module for styling
import { useState } from "react"; // Import useState hook for state management
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useAuth } from "../../auth"; // Import useAuth hook for authentication

const Loginpage = () => {
  const navigate = useNavigate(); // Navigation hook for routing
  const auth = useAuth(); // Authentication hook
  const [data, setData] = useState([]); // State for data
  const [user, setUser] = useState(""); // State for user
  const [inpVal, setInpVal] = useState({ // State for input values
    user: "",
    password: "",
  });

  // Function to handle input change and update state
  const getData = (e) => {
    const { value, name } = e.target;
    setUser(() => {
      return inpVal.user;
    });

    setInpVal(() => {
      return { ...inpVal, [name]: value };
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userArray = localStorage.getItem("userDetails"); // Get user details from localStorage

    const { user, password } = inpVal;
    if (user === "") {
      alert("Please enter Username");
    } else if (password === "") {
      alert("Please enter Password");
    } else if (userArray && userArray.length) {
      const userData = JSON.parse(userArray); // Parse user data from localStorage
      const userlogin = userData.filter((el) => {
        return el.user === user && el.password === password;
      });
      
      if (userlogin.length === 0) {
        alert("Invalid Details");
        localStorage.setItem("loggedIn", false);
      } else {
        console.log("User Logged In successfully");
        navigate('/');
        auth.login(user);
        localStorage.setItem("loggedIn", true);
      }
    }
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className={css.card}>
      <h1 className={css.header}>Welcome to AJIO</h1>
      <p>Please sign In</p>

      <form>
        <input
          className={css.name}
          type="text"
          name="user"
          placeholder="Username"
          required
          onChange={getData}
        />

        <input
          className={css.name}
          type="password"
          placeholder="password"
          name="password"
          required
          onChange={getData}
        />

        <label className={css.signin}>
          <input className={css.check} type="checkbox" id="signin" />
          By Signing In, I agree to the <a href="#">terms and Conditions</a>
        </label>
      </form>
      <button className={css.register} onClick={handleSubmit}>
        SIGN IN
      </button>
    </div>
  );
};

export default Loginpage;

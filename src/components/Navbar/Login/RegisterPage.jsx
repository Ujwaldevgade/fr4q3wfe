import React, { useState, useEffect } from "react";
import css from "./RegisterPage.module.css"; // Import CSS module for styling
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useAuth } from "../../auth"; // Import useAuth hook for authentication

const RegisterPage = () => {
  const navigate = useNavigate(); // Navigation hook for routing
  const auth = useAuth(); // Authentication hook
  const [data, setData] = useState([]); // State for data
  const [user, setUser] = useState(""); // State for user
  const [inpVal, setInpVal] = useState({ // State for input values
    user: "",
    Mobile: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  // Function to handle input change and update state
  const getData = (e) => {
    const { value, name } = e.target;
    setUser(() => {
      return inpVal.user;
    });

    console.log(user);

    setInpVal(() => {
      return { ...inpVal, [name]: value };
    });
    console.log(inpVal);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { user, Mobile, password, confirmPassword, gender } = inpVal;
    if (user === "") {
      alert("Please enter Username");
    } else if (Mobile === "") {
      alert("Please enter mobile number");
    } else if (Mobile.length !== 10) {
      alert("Mobile number must be 10 digits");
    } else if (password === "") {
      alert("Please enter Password");
    } else if (password.length < 8) {
      alert("Password must be greater than 8 digits");
    } else if (password !== confirmPassword) {
      alert("Password and confirm password are not matching");
    } else {
      console.log("Data Added Successfully");

      localStorage.setItem("userDetails", JSON.stringify([...data, inpVal]));
      navigate("/");
      auth.login(user);
    }
  };

  return (
    <div className={css.card}>
      <h1 className={css.header}>Welcome to AJIO</h1>
      <p>Please set up your account</p>

      <form>
        <label className={css.label}>
          Gender :
          <label>
            <input
              className={css.female}
              type="radio"
              value="female"
              id="female"
            />
            Female
          </label>
          <label>
            <input className={css.male} type="radio" value="male" id="male" />
            Male
          </label>
        </label>
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
          type="number"
          placeholder="Mobile"
          name="Mobile"
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
        <input
          className={css.name}
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          onChange={getData}
        />
        <label className={css.signin}>
          <input className={css.check} type="checkbox" id="signin" />
          By Signing Up, I agree to the <a href="#">terms and Conditions</a>
        </label>
      </form>
      <button className={css.register} onClick={handleSubmit}>
        REGISTER
      </button>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from "react";
import "./signin.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import music from "../images/music.png";
import { ToastContainer, toast } from "react-toastify";
import {Navigate, useNavigate} from  "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to your login endpoint
      const response = await axios.post("https://backend-1-blue.vercel.app/api/v1/login", {
        email,
        password,
      });

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);

      // Update the isLoggedIn state
      setIsLoggedIn(true);

      navigate('/');

      // Display a success toast
      toast.success("Successfully logged in!");
    } catch (error) {
      // Display an error toast
      toast.error("Failed to log in");
    }
  };

  const goToCreateAccount = () => {
    navigate("/CreateAccount");
   };
   

  return (
    <div>
      <img src={music} alt="" className="signin-img" />
      <div className="signin-container">
        <p className="signin-para">Sign in </p>
        <form onSubmit={handleSubmit}>
          <label className="signin-lab-1">
            Enter your email or mobile number
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signin-box-1"
            />
          </label>

          <label className="signin-lab-2">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signin-box-2"
            />
          </label>

          <button className="signin-conbtn">Continue</button>
          <p className="signin-para-1">
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </form>
      </div>

      <div className="signin-line1 "></div>

      <div className="signin-line2"></div>

      <p className="signin-para-2">New to Musicart?</p>

      <button className="signin-music-acc" onClick={goToCreateAccount} >Create your Musicart account</button>

      <div className="signin-footer">Musicart | All rights reserved</div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default Signin;

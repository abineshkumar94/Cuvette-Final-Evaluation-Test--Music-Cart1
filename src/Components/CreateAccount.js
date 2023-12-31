import React, { useState } from "react";
import "./createaccount.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate} from  "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import music from "../images/music.png";
import music1 from "../images/Group 30.png";
import axios from "axios";
import { toHaveStyle } from "@testing-library/jest-dom/matchers";

const CreateAccount = () => {
  const [name, setname] = useState("");
  const [number, setnumber] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const NameChange = (e) => {
    setname(e.target.value);
  };

  const NumberChange = (e) => {
    setnumber(e.target.value);
  };

  const EmailChange = (e) => {
    setemail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const handleContinue = async (e) => {
    e.preventDefault();

    //axios(backedurl/sign).then (() =.[SETSTATR(RES.DATA)])
    console.log("Name:", name);
    console.log("MobileNumber:", number);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const result = await axios.post("http://localhost:4000/api/v1/signup", {
        name: name,
        mobileNumber: number,
        email: email,
        password: password,
      });

      const data = result.data;
      if (data.success) {
        Cookies.set("token", data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user._id);
        toast("Success registered");
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="img-form">
      <div className="ca-hedder"></div>
      <p className="ca-res-para">Welcome</p>

      <img src={music} alt="" className="brand-img" />
      <img src={music1} alt="" className="ca-res-img" />
      <div className="form-container">
        <div className="ca-para">Create Account</div>
        <span className="media-line">Don’t have an account?</span>
        <form className="ca-form" onSubmit={handleContinue}>
          <label className="ca-label-1">
            Your name
            <input
              type="text"
              className="ca-box-1"
              value={name}
              onChange={NameChange}
            />
          </label>

          <label className="ca-label-2">
            Mobile number
            <input
              type="number"
              className="ca-box-2"
              value={number}
              onChange={NumberChange}
            />
          </label>

          <label className="ca-label-3">
            Email Id
            <input
              type="email"
              className="ca-box-3"
              value={email}
              onChange={EmailChange}
            />
          </label>

          <label className="ca-label-4">
            Password
            <input
              type="password"
              className="ca-box-4"
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <p className="ca-para-1">
            By enrolling your mobile phone number, you consent to
          </p>
          <p className="ca-para-2">
            {" "}
            receive automated security notifications via text
          </p>
          <p className="ca-para-3">
            message from Musicart. Message and data rates may apply.
          </p>

          <button className="ca-conbtn" type="submit">
            Continue
          </button>
          <p className="ca-para-4">
            By continuing, you agree to Musicart privacy notice and conditions
            <br />
            of use.
          </p>
        </form>
      </div>

      <Link to="/Signin" className="ca-para-5">
        Already have an account? Sign in
      </Link>

      <div className="ca-footer">Musicart | All rights reserved</div>
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

export default CreateAccount;

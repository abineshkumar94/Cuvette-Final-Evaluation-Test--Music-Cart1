import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthContext } from "./context/AuthContext";
import { Routes, Route, Link } from "react-router-dom";
import CreateAccount from "./Components/CreateAccount";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import ProductDetails from "./Components/ProductDetails";
import Cart from "./Components/Cart";
import CheckOut from "./Components/checkOut";
import Successful from "./Components/Successful";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn state from localStorage or default to false
    return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
  });

  // Update localStorage whenever isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, handleLogout }}>
        <Routes>
          <Route path="createaccount" element={<CreateAccount />} />
          <Route path="signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route path="productDetails/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/checkOut/:id" element={<CheckOut />} />
          <Route path="Successful" element={<Successful/>} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;

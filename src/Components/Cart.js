import React, { useState, useContext, useEffect } from "react";
import styles from "./cart.module.css";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Music from "../images/music.png";
import { useLocation } from "react-router-dom";
import myCartimg from "../images/Group 26.png";
import line1 from "../images/Line 2.png";
import { useNavigate } from "react-router-dom";
import leftAro from "../images/leftaro.png";
import music1 from "../images/Group 30.png";
import homeMedia from "../images/mediahome.png";
import cartMedia from "../images/mediacart.png";
import logoutMedia from "../images/medialogout.png";
import loginMedia from "../images/medialogin.png";

const Cart = () => {
  const backendUrl = "https://backend-1-blue.vercel.app/api/v1/cart/";

  const location = useLocation();
  const cartId = location.state ? location.state.cartId : null;
  const [quantity, setQuantity] = useState(1);
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  const handleQuentityChange = (event) => {
    setQuantity(event.target.value);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}${cartId}`);
        setproducts(response.data);
        localStorage.setItem("cartItems", JSON.stringify(response.data));
        console.log(localStorage.getItem("cartItems")); // Add this line
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setproducts(JSON.parse(cartItems));
    } else {
      fetchProduct();
    }

    const productFromState = location.state ? location.state.product : null;
    if (productFromState) {
      setproducts((prevProducts) => [...prevProducts, productFromState]);
    }
  }, [cartId]);

  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  const placeOrder = (productToOrder) => {
    const updatedProducts = products.filter(
      (product) => product._id !== productToOrder._id
    );
    setproducts(updatedProducts);

    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));

    navigate(`/checkout/${productToOrder._id}`, {
      state: { product: productToOrder },
    });
  };

  const CartToHome = () => {
    navigate(`/`);
  };

  const goSignIn = () => {
    navigate("/Signin ");
  };

  const imInCart = () => {
    navigate("/Cart ");
  };
  return (
    <div>
      {/* <h3>price-₹{user.mobileNumber}</h3> */}
      <p className="navpara-1">Get 50% off on selected items | Shop Now </p>
      <nav>
        <img src={music1} alt="just an img" className={styles.cartMusicimg} />
        {!isLoggedIn ? (
          <>
            <Link to="/signin">Signup</Link>
            <Link to="/createaccount">Login |</Link>
          </>
        ) : (
          <h3 className="logout-text" onClick={handleLogout}>
            Logout
          </h3>
        )}
      </nav>

      <img src={Music} alt="" className="home-music-img" />
      <p className="navpara-2">Home/ View Cart</p>

      <div>
        <button className={styles.cartBtpBtn} onClick={CartToHome}>
          Back to Product
        </button>
      </div>

      <button className={styles.backBtnMedia} onClick={CartToHome}>
        <img src={leftAro} alt="just a aro" />
      </button>

      <img src={myCartimg} alt="" className={styles.mycartimg} />

      <div>
        {products.map((product) => (
          <div key={product._id} id={product._id}>
            <img src={line1} alt="" className={styles.horizontalLine1} />
            <div className={styles.cartImgBox}>
              <img
                src={product.image[0].url}
                alt=""
                className={styles.cartProductImg}
              />
            </div>
            <div>
              <p className={styles.cartMname}> {product.heading} </p>
              <p className={styles.pdPriceMedia1}>₹ {product.price} </p>
              <h4 className={styles.cartPdclr}>Clour : {product.colour}</h4>
              <h4 className={styles.cartPdStock}>In Stock</h4>
              <p className={styles.conveFeeMedia}>
                Convenience Fee&nbsp;&nbsp;&nbsp;&nbsp; ₹ 45
              </p>
              <p className={styles.cartTotalmedia}>
                Total:
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹{" "}
                {product.price + 45}
              </p>
              <p className={styles.cartItem1}>1 Item</p>
              <span className={styles.horizontalLineMedia}></span>
              <p className={styles.finalTotalMedia}>
                Total Amount ₹ {product.price + 45}
              </p>
            </div>
            <div>
              <p className={styles.cartPdPrice}>Price</p>
              <p className={styles.priceNumbers}>₹ {product.price} </p>
            </div>

            <div className={styles.carddrop}>
              <p className={styles.cartQuantity}>Quantity</p>
              <select
                className={styles.carddropStyle}
                onChange={handleQuentityChange}
              >
                <option value="" selected disabled>
                  1
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div>
              <p className={styles.cartTotal}>Total</p>
              <p className={styles.cartTotalPrice}>
                ₹ {product.price * quantity}
              </p>
              <p className={styles.cartFinalTotalPrice}>
                ₹ {product.price * quantity}
              </p>
            </div>
            <div className={styles.rightSideDetails}>
              <p>PRICE DETAILS</p>
              <p className={styles.totalMrp}>
                Total MRP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;₹{" "}
                {product.price * quantity}
              </p>
              <p className={styles.discount}>Discount on MRP 0</p>
              <p className={styles.conveFee}>Convenience Fee 45</p>
              <p className={styles.finalTotal}>
                Total Amount ₹ {product.price * quantity + 45}
              </p>
            </div>
            <button
              className={styles.placeOrderbtn}
              onClick={() => placeOrder(product)}
            >
              PLACE ORDER
            </button>
            <div style={{ height: "10vh" }}></div>
          </div>
        ))}
      </div>
      <div className={styles.homeFotterCartMedia}>
        <span className={styles.footerTextCartMedia}>
          Musicart | All rights reserved
        </span>
        <button className={styles.homemediabtnCartMedia}>
          <img
            src={homeMedia}
            alt="mediaicon"
            className={styles.homemediaCartMedia}
            onClick={CartToHome}
          />
        </button>
        <button className={styles.cartmediabtnCartMedia}>
          <img
            src={cartMedia}
            alt="cartmedia"
            className={styles.cartmediaCartMedia}
            onClick={imInCart}
          />
        </button>
        {!isLoggedIn ? (
          <>
            <button className={styles.loginmediabtnCartMedia}>
              <img
                src={loginMedia}
                alt="cartmedia"
                className={styles.loginmediaCartMedia}
                onClick={goSignIn}
              />
            </button>
          </>
        ) : (
          <button className={styles.logoutmediabtnCartMedia}>
            <img
              src={logoutMedia}
              alt="cartmedia"
              className={styles.logoutmediaCartMedia}
              onClick={handleLogout}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;

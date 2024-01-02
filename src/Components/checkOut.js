import React, { useState, useContext, useEffect } from "react";
import styles from "./checkout.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Music from "../images/music.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import music1 from "../images/Group 30.png";
import leftAro from "../images/leftaro.png";
import homeMedia from "../images/mediahome.png";
import cartMedia from "../images/mediacart.png";
import logoutMedia from "../images/medialogout.png";
import loginMedia from "../images/medialogin.png";

const CheckOut = () => {
  const backendUrl = "https://backend-1-blue.vercel.app/api/v1/buyNow/";
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const backToCart = () => {
    navigate("/Cart ");
  };

  const towardsHome = () => {
    navigate("/ ");
  };

  const backTosignin = () => {
    navigate("/ Signin");
  };


  const successfullPage = () => {
    navigate("/Successful");
  };

  const CheckOut = () => {
    const location = useLocation();
    const product = location.state ? location.state.product : null;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${backendUrl}${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <div>
      <p className="navpara-1">Get 50% off on selected items | Shop Now </p>
      <nav>
        <img
          src={music1}
          alt="just an img"
          className={styles.checkoutMusicimg}
        />
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
      <p className="navpara-2">Home/ Checkout</p>

      <button className={styles.checkOutBack} onClick={backToCart}>
        Back to Cart
      </button>

      <button className={styles.checkoutBackBtnMedia} onClick={backToCart}>
        <img src={leftAro} alt="just a aro" />
      </button>

      <h1 className={styles.checkoutUnderline}>
        <u>Checkout</u>
      </h1>

      {product && (
        <div key={product._id} id={product._id}>
          <div className={styles.deliveryAddContainer}>
            <p className={styles.deliAdd}>1. Delivery address</p>
            <p className={styles.personAdd}>
              Akash Patel
              <br /> 104 <br />
              kk hh nagar, Lucknow <br /> Uttar Pradesh 226025
            </p>
          </div>

          <div className={styles.checkOutLine1} />

          <div>
            <p className={styles.payMentMethod}>2. Payment method</p>
            <p className={styles.paymentType}>Pay on delivery ( Cash/Card )</p>
          </div>
          <div className={styles.checkOutLine3} />

          <div>
            <p className={styles.rind}>3. Review items and delivery</p>
            <div className={styles.checkOutImgBox}>
              <img
                src={product.image[0].url}
                alt=""
                className={styles.checkOutProductImg}
              />
            </div>
            <p className={styles.checkOutBrand}>{product.heading}</p>
            <p className={styles.checkoutProductClr}>
              Clour : {product.colour}{" "}
            </p>
            <p className={styles.checkOutProductStk}>In Stock</p>
            <p className={styles.delivaryTime}>
              Estimated delivery :<br /> Monday — FREE Standard Delivery
            </p>
            <p className={styles.odrSummaryMedia}>Order Summary</p>
            <p className={styles.checkoutPlaceOdr2ItemMedia}>
              Items : ₹ {product.price}{" "}
            </p>
            <p className={styles.checkoutPlaceDeliveryMedia}>
              Delivery : ₹45.00
            </p>
            <p className={styles.checkOutPlaceOdrTotalMedia}>
              Order Total : ₹ {product.price + 45}{" "}
            </p>
          </div>
          <button className={styles.PlaceUrOdrBtnMedia} onClick={successfullPage } >
            Place your order
          </button>
          <div style={{ height: "10vh" }}></div>
          <div className={styles.checkOutLine2} />

          <div className={styles.checkoutPlaceOdr1}>
            <button className={styles.PlaceUrOdrBtn1} onClick={successfullPage } >Place your order</button>
            <p className={styles.checkoutAtoMt1}>
              Order Total : ₹ {product.price + 45}{" "}
            </p>
            <p className={styles.checkoutAtoMt2}>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </p>
            
          </div>
          <div style={{ height: "10vh" }}></div>
          <div className={styles.checkoutPlaceOdr2}>
            <button className={styles.PlaceUrOdrBtn2}>Place your order</button>
            <p className={styles.checkoutAtoMt3}>
              By placing your order, you agree to Musicart privacy <br />
              notice and conditions of use.
            </p>
            <p className={styles.checkOutOdrSum}>Order Summary</p>
            <p className={styles.checkoutPlaceOdr2Item}>
              Items : ₹ {product.price}{" "}
            </p>
            <p className={styles.checkoutPlaceDelivery}>Delivery : ₹45.00</p>
            <p className={styles.checkOutPlaceOdrTotal}>
              Order Total : ₹ {product.price + 45}{" "}
            </p>
          </div>
        </div>
      )}
      
      <div className={styles.homeFotterCartMedia}>
        <span className={styles.footerTextCartMedia}>
          Musicart | All rights reserved
        </span>
        <button className={styles.homemediabtnCartMedia}>
          <img
            src={homeMedia}
            alt="mediaicon"
            className={styles.homemediaCartMedia}
            onClick={towardsHome}
          />
        </button>
        <button className={styles.cartmediabtnCartMedia}>
          <img
            src={cartMedia}
            alt="cartmedia"
            className={styles.cartmediaCartMedia}
            onClick={backToCart}
          />
        </button>
        {!isLoggedIn ? (
          <>
            <button className={styles.loginmediabtnCartMedia}>
              <img
                src={loginMedia}
                alt="cartmedia"
                className={styles.loginmediaCartMedia}
                onClick={backTosignin}
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

export default CheckOut;

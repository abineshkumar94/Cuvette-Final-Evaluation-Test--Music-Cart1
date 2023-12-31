import React, { useState, useContext, useEffect } from "react";
import styles from "./checkout.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Music from "../images/music.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CheckOut = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const backToCart = () => {
    navigate("/Cart ");
  };

  const CheckOut = () => {
    const location = useLocation();
    const product = location.state ? location.state.product : null;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/buyNow/${id}`
        );
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
          </div>
          <div className={styles.checkOutLine2} />

          <div className={styles.checkoutPlaceOdr1}>
            <button className={styles.PlaceUrOdrBtn1}>Place your order</button>
            <p className={styles.checkoutAtoMt1}>
              Order Total : ₹ {product.price + 45}{" "}
            </p>
            <p className={styles.checkoutAtoMt2}>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </p>
          </div>

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

      <div className={styles.checkOutFooter}>
        Musicart | All rights reserved
      </div>
    </div>
  );
};

export default CheckOut;



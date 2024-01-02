import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import styles from "./productdetail.module.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Music from "../images/music.png";
import viewCartBtn from "../images/Group 25.png";
import stars from "../images/stars.png";
import leftAro from "../images/leftaro.png";
import search from "../images/search.png";
import homeMedia from "../images/mediahome.png";
import cartMedia from "../images/mediacart.png";
import logoutMedia from "../images/medialogout.png";
import loginMedia from "../images/medialogin.png";

const ProductDetails = () => {
  const backendUrl = "https://backend-1-blue.vercel.app/api/v1/productdetails/"; 
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Product ID:", id);
        const response = await axios.get(
          `${backendUrl}${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return;
    toast("Loading please waite");
  }

  const goToHome = () => {
    navigate("/");
  };

  const goToSign = () => {
    navigate("/Signin ");
  };

  const buyNow = () => {
    navigate(`/checkout/${product._id}`);
  };

  const PdViewCart = () => {
    navigate("/Cart");
  };

  const addToCart = () => {
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
    } else {
      cartItems = [];
    }
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div>
      {/* <h3>price-₹{user.mobileNumber}</h3> */}
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
        <form className= {styles.searchform}>
          <input type="text" placeholder="Search Musicart" className= {styles.searchinput} />
          <button type="submit" className= {styles.searchbutton} >
           <img
           src={search }
           alt=""
           className= {styles.searchicon}
           />
          </button>
        </form>
      </nav>

      <img src={Music} alt="" className={styles.pdMusic} />
      <p className="navpara-2">Home / Prodectdetails</p>

      {isLoggedIn && (
        <button className="view-cart-btn ">
          <img
            src={viewCartBtn}
            alt="viewcartBtn"
            style={{ width: "127px", height: "37px" }}
            onClick={PdViewCart}
          />
        </button>
      )}

      <button className={styles.btpBtn} onClick={goToHome}>
        Back to products
      </button>

      <h3 className={styles.pdDetailHeading}>{product.detailHeading}</h3>

      <div>
        <p className={styles.pdProductName}>
          {product.heading}
          {product.brand}
        </p>
        <button className={styles.aroForMedia}>
          <img src={leftAro} alt="just a aro" onClick={goToHome} />
        </button>
      </div>

      <div>
        <img
          src={stars}
          alt="stars"
          // style={{ width: "150px", height: "30px" }}
          className={styles.pdStars}
        />
        <h3 className={styles.pdStarText}>(50 Customer reviews)</h3>
        <h3 className={styles.pdDetailHeadingmedia}>{product.detailHeading}</h3>
      </div>

      <div>
        <h3 className={styles.pdPrice}>Price - ₹ {product.price} </h3>
        <p className={styles.pdHeadphoneType}>
          {product.colour} | {product.headphoneType}
        </p>
      </div>

      <div className={styles.pdAllSpec}>
        About this item
        <ul className={styles.pdUl}>
          <li>{product.aboutThisItem[0]}</li>
          <li>{product.aboutThisItem[1]}</li>
          <li>{product.aboutThisItem[2]}</li>
          <li>{product.aboutThisItem[3]}</li>
          <li>{product.aboutThisItem[4]}</li>
        </ul>
      </div>
      <p className={styles.instock}>Available - In stock</p>

      <button className={styles.buyNowForMedia} onClick={buyNow}>
        Buy Now
      </button>

      <div className={styles.pdImgBox}>
        <img src={product.image[0].url} alt="" className={styles.pdimg0} />
      </div>

      <div className={styles.pdImgSmallContainer}>
        <div className={styles.pdSmallImg1}>
          <img src={product.image[0].url} alt="" className={styles.pdimg1} />
        </div>
        <div className={styles.pdSmallImg2}>
          <img src={product.image[1].url} alt="" className={styles.pdimg1} />
        </div>
        <div className={styles.pdSmallImg3}>
          <img src={product.image[2].url} alt="" className={styles.pdimg1} />
        </div>

        <div style={{ height: "10vh" }}></div>
      </div>

      {!isLoggedIn ? (
        <div>
          <button className={styles.pdSignInBtn} onClick={goToSign}>
            Sign In
          </button>
        </div>
      ) : (
        <div className={styles.pdAddBuydiv}>
          {/* <p className= {styles.pdStockBrand } >Brand {product.brand} </p> */}
          <button className={styles.pdAddCartBtn} onClick={addToCart}>
            Add to Cart
          </button>
          <button className={styles.pdBuyNowBtn} onClick={buyNow}>
            Buy Now
          </button>
          <div style={{ height: "10vh" }}></div>
        </div>
      )}

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
      <ToastContainer />

      <div className={styles.homeFotterCartMedia}>
        <span className={styles.footerTextCartMedia}>
          Musicart | All rights reserved
        </span>
        <button className={styles.homemediabtnCartMedia}>
          <img
            src={homeMedia}
            alt="mediaicon"
            className={styles.homemediaCartMedia}
            onClick={goToHome}
          />
        </button>
        <button className={styles.cartmediabtnCartMedia}>
          <img
            src={cartMedia}
            alt="cartmedia"
            className={styles.cartmediaCartMedia}
            onClick={PdViewCart}
          />
        </button>
        {!isLoggedIn ? (
          <>
            <button className={styles.loginmediabtnCartMedia}>
              <img
                src={loginMedia}
                alt="cartmedia"
                className={styles.loginmediaCartMedia}
                onClick={goToSign }
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

export default ProductDetails;

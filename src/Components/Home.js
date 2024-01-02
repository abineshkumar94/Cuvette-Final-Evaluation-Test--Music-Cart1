import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Music from "../images/music.png";
import viewCartBtn from "../images/Group 25.png";
import cimgone from "../images/container-img-1.png";
import cimgtwo from "../images/container-img-2.png";
import cimgthree from "../images/container-img-3.png";
import search from "../images/search.png";
import gridv from "../images/grid-view-rounded.svg";
import listv from "../images/list-rounded.svg";
import cartIcon from "../images/cartIcon.png";
import homeMedia from "../images/mediahome.png";
import cartMedia from "../images/mediacart.png";
import logoutMedia from "../images/medialogout.png";
import loginMedia from "../images/medialogin.png";

const Home = () => {
  const backendUrl = "https://backend-1-blue.vercel.app/api/v1/";
  const [products, setproducts] = useState([]);
  const [isGridView, setIsGridView] = useState(true);
  const [isListView, setIsListView] = useState(false);
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [cartId, setCartId] = useState([]);
  const navigate = useNavigate();
  console.log("isLoggedIn: ", isLoggedIn);
  const [headphoneType, setHeadphoneType] = useState("");
  const [brand, setBrand] = useState("");
  const [colour, setColour] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleHeadphoneTypeChange = (event) => {
    setHeadphoneType(event.target.value);

    fetch(`${backendUrl}/products?headphoneType=${event.target.value}`)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);

    fetch(`${backendUrl}products?brand=${event.target.value}`)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  };

  const handleColourChange = (event) => {
    setColour(event.target.value);

    fetch(
      `${backendUrl}products?colour=${event.target.value}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    )
      .then((res) => res.json())
      .then((data) => setproducts(data));
  };

  const handlePriceChange = (event) => {
    const [min, max] = event.target.value.split("-");
    setMinPrice(Number(min));
    setMaxPrice(Number(max));

    fetch(
      `${backendUrl}products?colour=${colour}&minPrice=${min}&maxPrice=${max}`
    )
      .then((res) => res.json())
      .then((data) => setproducts(data));
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);

    fetch(
      `${backendUrl}products?colour=${colour}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${event.target.value}`
    )
      .then((res) => res.json())
      .then((data) => setproducts(data));
  };

  useEffect(() => {
    console.log(products);
  }, [products]);

  const handleGridClick = () => {
    setIsGridView(true);
    setIsListView(false);
  };

  const handleListClick = () => {
    setIsGridView(false);
    setIsListView(true);
  };

  const goToCart = () => {
    navigate("/Cart ");
  };

  const iamHome = () => {
    navigate("/");
  };

  const goToSignIn = () => {
    navigate("/Signin ");
  };

  <Link
    to={{
      pathname: "/Cart",
      state: { cartId },
    }}
  ></Link>;

  const handleCartId = (e) => {
    e.stopPropagation();
    let cartId = e.target.getAttribute("id");
    console.log(cartId);
    const productToAdd = products.find((product) => product._id === cartId);
    let cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
    } else {
      cartItems = [];
    }
    cartItems.push(productToAdd);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    fetch(`${backendUrl}products`)
      .then((res) => res.json())
      .then((data) => setproducts(data));
  }, []);

  const [sort, setSort] = useState("");

  return (
    <div className="parentdiv">
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
      </nav>

      <img src={Music} alt="" className="home-music-img" />
      <p className="navpara-2">Home</p>

      {isLoggedIn && (
        <button className="view-cart-btn " onClick={goToCart}>
          <img
            src={viewCartBtn}
            alt="viewcartBtn"
            style={{ width: "127px", height: "37px" }}
          />
        </button>
      )}

      <div className="img-container">
        <img src={cimgone} alt="" className="container-img-1" />
        <img src={cimgtwo} alt="" className="container-img-2" />
        <img src={cimgthree} alt="" className="container-img-3" />
      </div>

      <form className="search-container">
        <button type="submit">
          <img src={search} alt="search-icon" className="" />
        </button>
        <input
          type="text"
          placeholder="Search Product"
          className=""
          value={searchQuery}
        />
      </form>

      <button className="grid-btn1" onClick={handleGridClick}>
        <img
          src={gridv}
          alt="grid-icon"
          style={{ width: "30px", height: "30px" }}
        />
      </button>
      <button className="grid-btn2" onClick={handleListClick}>
        <img
          src={listv}
          alt="list-icon"
          style={{ width: "40px", height: "40px" }}
        />
      </button>

      <div className="buttons-container ">
        <select
          className="ddown-container-1"
          value={headphoneType}
          onChange={handleHeadphoneTypeChange}
        >
          <option value="" selected disabled>
            Headphone type
          </option>
          <option value="Featured">Featured</option>
          <option value="In-ear">In-ear</option>
          <option value="On-ear">On-ear</option>
          <option value="Over-ear">Over-ear</option>
        </select>

        <select
          className="ddown-container-2"
          value={brand}
          onChange={handleBrandChange}
        >
          <option value="" selected disabled>
            Company
          </option>
          <option value="Featured">Featured</option>
          <option value="JBL">JBL</option>
          <option value="sony">sony</option>
          <option value="boat">boat</option>
          <option value="zebronics">zebronics</option>
          <option value="marshall">marshall</option>
          <option value="samsung">samsung</option>
        </select>

        <select
          className="ddown-container-3"
          value={colour}
          onChange={handleColourChange}
        >
          <option value="" selected disabled>
            Colour
          </option>
          <option value="Featured">Featured</option>
          <option value="black">black</option>
          <option value="white">white</option>
          <option value="blue">blue</option>
        </select>

        <select className="ddown-container-4" onChange={handlePriceChange}>
          <option value="" selected disabled className="font1">
            Price
          </option>
          <option value="Featured">Featured</option>
          <option value="0-1000">₹ 0 - ₹ 1000 </option>
          <option value="1000-10000">₹ 1000 - ₹ 10000 </option>
          <option value="10000-20000">₹ 10000 - ₹ 20000 </option>
        </select>

        <select
          className="ddown-container-5"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="" selected disabled className="font1">
            Short by : Featured
          </option>
          <option value="Featured">Featured</option>
          <option value="priceLowToHigh">Price : Lowest</option>
          <option value="priceHighToLow">Price : Highest</option>
          <option value="nameAToZ">Name : (A-Z)</option>
          <option value="nameZToA">Name : (Z-A)</option>
        </select>
      </div>

      <div className={isGridView ? "grid-view-class" : "listViewContainer "}>
        {products.map((product) => (
          <div key={product._id} id={product._id}>
            <div className={isGridView ? "img-bg-box" : "listViewImgBox"}>
              <Link to={`/productdetails/${product._id}`} key={product._id}>
                <div
                  className={
                    isGridView ? "img-container-div" : "listViewImgDiv"
                  }
                >
                  <img src={product.image[0].url} alt={product.detailHeading} />
                </div>
              </Link>

              {isLoggedIn && (
                <button
                  className={isGridView ? "green-cart" : "listViewCartBtn "}
                >
                  <img
                    src={cartIcon}
                    alt="shoping-cart-icon"
                    style={{ width: "35px", height: "35px" }}
                    id={product._id}
                    onClick={handleCartId}
                  />
                </button>
              )}
            </div>
            <div className={isGridView ? "" : "listViewProductDetails"}>
              <h2 className="pdDetailsfont ">{product.heading}</h2>
              <h3 className="pdDetailsfont ">price-₹{product.price}</h3>
              <p className="pdDetailsfont ">colour :{product.colour}</p>
              <p className="pdDetailsfont ">
                headphoneType | {product.headphoneType}
              </p>
              <p
                className={`${
                  isGridView ? "gridViewPara" : "listViewPara"
                } pdDetailsfont`}
              >
                {" "}
                {product.detailHeading}{" "}
              </p>
              <button
                className={
                  isGridView
                    ? "gridViewDetailsButton "
                    : "listViewDetailsButton"
                }
              >
                Details
              </button>

              <div style={{ height: "10vh" }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="homeFotter">
        <span className="footerText">Musicart | All rights reserved</span>
        <button className="home-media-btn">
          <img
            src={homeMedia}
            alt="mediaicon"
            className="home-media"
            onClick={iamHome}
          />
        </button>
        <button className="cartmediabtn">
          <img
            src={cartMedia}
            alt="cartmedia"
            className="cartmedia"
            onClick={goToCart}
          />
        </button>
        {!isLoggedIn ? (
          <>
            <button className="loginmediabtn ">
              <img
                src={loginMedia}
                alt="cartmedia"
                className="loginmedia"
                onClick={goToSignIn}
              />
            </button>
          </>
        ) : (
          <button className="logoutmediabtn ">
            <img
              src={logoutMedia}
              alt="cartmedia"
              className=" logoutmedia"
              onClick={handleLogout}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;

{
  /* <button className="logoutmediabtn " >
          <img src= {logoutMedia} alt="cartmedia" className=" logoutmedia" onClick={handleLogout} />
        </button>
        <button className="loginmediabtn " >
          <img src= {loginMedia } alt="cartmedia" className="loginmedia" onClick={goToSignIn}/>
        </button> */
}

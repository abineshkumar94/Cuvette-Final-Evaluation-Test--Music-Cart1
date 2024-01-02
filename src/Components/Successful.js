import React from 'react'
import styles from "./Successful.module.css"
import Music from "../images/music.png";
import Lastone from "../images/lastone.png"
import { useNavigate } from "react-router-dom";

 const Successful = () => {
    const navigate = useNavigate();
    
    const iamHome = () => {
        navigate("/");
      };

  return (
    <div>
        <img src={Music} alt="" className="home-music-img" />
        <div className= {styles.finalImgContainer} >
            <img src= {Lastone} alt='the-last-pic' className= {styles.theLastPic }/>
            <p className= {styles.odrplaced} >Order is placed successfully!</p>
            <p className= {styles.odrTrack } >You  will be receiving a confirmation email with order details</p>
            <button className= {styles.successBack } onClick={iamHome}>Go back to Home page</button>
        </div>

        <div className="homeFotter">
        <span className="footerText">Musicart | All rights reserved</span>
        </div>
    </div>
  )
}

export default Successful
import React, { useState, useEffect } from 'react';
import css from '../Homepage/Home.modules.css'; // Importing CSS module for styling
import Carousel from './Carousel'; // Importing Carousel component
import { images, secondBanImgs, brandImgs, car3, car4, car5 } from './Resources/carouselImages'; // Importing carousel images
import SmallCarousel from './SmallCarousel'; // Importing SmallCarousel component
import { sc1, sc2, sc3, sc4 } from './Resources/SmallCarouselImages'; // Importing small carousel images
import PropagateLoader from "react-spinners/PropagateLoader"; // Importing spinner for loading state

function Home({ cart }) {
  const isAuthenticated = localStorage.getItem("loggedIn"); // Checking if the user is authenticated
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [colour, setColour] = useState("#2c4152"); // State to handle colour (not used here)

  useEffect(() => {
    // If cart is not defined, set loading to false, otherwise true
    !cart ? setLoading(false) : setLoading(true);
    // Set loading to false after 3 seconds
    setTimeout(() => {
      setLoading(false);
      console.log("second", loading);
    }, 3000);
  }, []);

  return (
    <>
      {/* If loading is true, show the spinner, otherwise show the content */}
      {loading ? (
        <div style={{ width: "100%", height: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PropagateLoader
            color="#2c4152"
            cssOverride={{}}
            loading
            speedMultiplier={1}
          />
        </div>
      ) : (
        <div>
          {/* Main Carousel components with different images */}
          <Carousel images={images} />
          <Carousel images={secondBanImgs} />

          {/* Main banner-3 */}
          <div className={css['mainbanner-3']}>
            <img className={css.bannerimg} src="https://assets.ajio.com/cms/AJIO/WEB/02062023-UHP-BBS-D-Sponsorbrands-Sectionheader.jpg" alt="" />
          </div>

          <Carousel images={brandImgs} />

          {/* Main banner-4 */}
          <div className={css['mainbanner-4']}>
            <img className={css.bannerimg} src="https://assets.ajio.com/cms/AJIO/WEB/05052023-UHP-Summerstealontopbrands-D-Sectionheader.jpg" alt="" />
          </div>

          {/* Carousel-3 */}
          <Carousel images={car3} />

          {/* Main banner-5 */}
          <div className={css['mainbanner-5']}>
            <img className={css.bannerimg} src="https://assets.ajio.com/cms/AJIO/WEB/01062023-UHP-Sponsorbrands-D-Sectionheader.jpg" alt="" />
          </div>

          <SmallCarousel images={sc1} />
          
          {/* Main banner-6 */}
          <div className={css['mainbanner-6']}>
            <img className={css.bannerimg} src="https://assets.ajio.com/cms/AJIO/WEB/02062023-UHP-BBS-D-Todaysfashionbulleting-Sectionheader.jpg" alt="" />
          </div>

          <Carousel images={car4} />

          {/* Main banner-7 */}
          <div className={css['mainbanner-7']}>
            <img className={css.bannerimg} src="https://assets.ajio.com/cms/AJIO/WEB/01062023-UHP-Newonthebestsellers-D-Sectionheader.jpg" alt="" />
          </div>

          <Carousel images={car5} />

          {/* Last banners and small carousels */}
          <div className="lbannerlast-1">
            <img
              className={css.bannerimg}
              src="https://assets.ajio.com/cms/AJIO/WEB/01062023-UHP-Theajiobrandverse-D-Sectionheader.jpg"
              alt=""
            />
          </div>
          
          <SmallCarousel images={sc2} />
          <SmallCarousel images={sc3} />
          <SmallCarousel images={sc4} />

          <div className="lbannerlast-1">
            <img
              className="banner-img"
              src="./img/mainBanners/lbannerlast-1.avif"
              alt=""
            />
          </div>

          {/* Image slabs */}
          <div className="imageSlab-1" id="i-1"></div>
          <div className="imageSlab-2" id="i-2"></div>
          <div className="imageSlab-3" id="i-3"></div>
          <div className="imageSlab-4" id="i-4"></div>
          <div className="imageSlab-5" id="i-5"></div>

          {/* Last big images */}
          <div className="lastbigimage">
            <img
              className="banner-img"
              src="https://assets.ajio.com/cms/AJIO/WEB/Discover%20Online%20Stores%20(D)1111.jpg"
              alt=""
            />
          </div>
          <div className="lastBanner">
            <img
              className="banner-img"
              src="https://assets.ajio.com/cms/AJIO/WEB/08032022-D-unisex-ajiocares-strip%20new%20d.jpg"
              alt=""
            />
          </div>  
        </div>
      )}
    </>
  );
}

export default Home;

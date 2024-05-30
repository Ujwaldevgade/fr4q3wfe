import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ images }) => {
  
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      id="carouselExampleInterval"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Link to the products page with scroll to top */}
      <Link to={"/products"} onClick={() => window.scrollTo(0, 0)} >
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            {/* Display the third image in the carousel */}
            <img src={images.img3} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            {/* Display the second image in the carousel */}
            <img src={images.img2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            {/* Display the first image in the carousel */}
            <img src={images.img1} className="d-block w-100" alt="..." />
          </div>
        </div>
        {/* Previous button for the carousel */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        {/* Next button for the carousel */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </Link>
    </div>
  );
};

export default Carousel;

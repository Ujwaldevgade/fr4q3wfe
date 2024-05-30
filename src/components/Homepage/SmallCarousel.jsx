import React,{ useEffect } from "react"; // Importing React and useEffect hook from React library
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation

// SmallCarousel functional component accepting an 'images' prop
const SmallCarousel = ({ images }) => {

  // useEffect hook to scroll the window to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // Wrapper div containing the entire SmallCarousel component
    <div>
      {/* Link component to navigate to the '/products' route when any image is clicked */}
      <Link to={'/products'} onClick={() => window.scrollTo(0, 0)}>
        {/* Displaying images passed through the 'images' prop */}
        <img src={images.img1} alt="" />
        <img src={images.img2} alt="" />
        <img src={images.img3} alt="" />
        <img src={images.img4} alt="" />
      </Link>
    </div>
  );
};

export default SmallCarousel; // Exporting SmallCarousel component as the default export

import React, { useEffect } from "react";

const SavedCart = ({ cartproducts, fetchCart }) => {

  // Fetch the cart data when the component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Save the cart data to local storage whenever cartproducts changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartproducts));
    console.log(cartproducts);
  }, [cartproducts]);

  return (
    <div>.</div>
  );
}

export default SavedCart;

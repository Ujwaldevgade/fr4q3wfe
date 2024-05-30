import React, { useEffect, useState } from "react";
import { Typography, Container, Grid } from "@mui/material";
import CartItem from "./CartItem";
import css from "./Cart.module.css";
import PropagateLoader from "react-spinners/PropagateLoader";
import SavedCart from "./SavedCart";

const Cart = ({
  cart,
  handleUpdateCartQty,
  handleRemoveFromCart,
  handleEmptyCart,
  fetchCart,
}) => {
  // State for storing cart items
  const [items, setItems] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for loader color
  const [colour, setColour] = useState("#2c4152");

  // Initial price calculation
  let price = 0;
  if (cart && cart.subtotal) {
    price = cart.subtotal.raw;
    // Store price in local storage
    localStorage.setItem("price", JSON.stringify(price));
  }

  // Calculate discount and final price
  const discountPrice = (40 * price) / 100;
  const finalPrice = parseFloat(price - discountPrice).toFixed(0);

  // Retrieve stored cart items from local storage
  const storedItems = localStorage.getItem("cart");
  console.log(storedItems);
  const cartstored = JSON.parse(storedItems);
  console.log(cartstored);

  useEffect(() => {
    // Set loading state to true
    setLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // Fetch cart data
    fetchCart();
    // If cart is not available, retrieve from local storage
    if (!cart) {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      setItems(storedCart);
    }
    // Set loading state to false
    setLoading(false);
  }, []);

  // Loader style override
  const override = {
    display: "block",
    margin: "200px",
    borderColor: "red",
  };

  // Component to display when cart is empty
  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your Shopping cart, Start shopping
      </Typography>
    );
  };

  // Display loading spinner if cart is not available
  if (!cart) {
    return (
      <div className={css.contain}>
        <PropagateLoader
          colour="#2c4152"
          cssOverride={{}}
          loading
          speedMultiplier={1}
        />
      </div>
    );
  }

  // Component to display when cart has items
  const FilledCart = () => {
    return (
      <div>
        {loading ? (
          <div>Loading....</div>
        ) : (
          <div className={css.container}>
            <Grid Container spacing={3} className={css.leftside}>
              {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} md={3} key={item.id}>
                  <CartItem
                    item={item}
                    handleUpdateCartQty={handleUpdateCartQty}
                    handleRemoveFromCart={handleRemoveFromCart}
                    fetchCart={fetchCart}
                    cart={cart}
                  />
                </Grid>
              ))}
              <button
                className={css.emptybutton}
                type="button"
                onClick={() => {
                  handleEmptyCart();
                }}
              >
                EMPTY CART
              </button>
            </Grid>
            <div className={css.rightside}>
              <h6>Order Details</h6>
              <div className={css.bagtotal}>
                <p>Bag total: </p>
                <p>Rs.{cart.subtotal.formatted_with_symbol}.00</p>
              </div>
              <div className={css.bagdiscount}>
                <p>Bag discount: </p>
                <p className={css.dis2}>Rs.-₹{discountPrice}</p>
              </div>
              <div className={css.ordertotal}>
                <p>Order Total</p>
                <p>Rs.₹{finalPrice}</p>
              </div>

              <div>
                <button className={css.button}>PROCEED TO SHIPPING</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the main component
  return (
    <Container>
      <p className={css.mybag}>
        My Bag<p className={css.items}>({cart?.total_items}items)</p>
      </p>
      {!cart?.line_items || cart.line_items.length === 0 ? (
        <EmptyCart />
      ) : (
        <FilledCart />
      )}
      <SavedCart cartproducts={cart} fetchCart={fetchCart} />
    </Container>
  );
};

export default Cart;

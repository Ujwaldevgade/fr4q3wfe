// Import necessary modules and components
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Navbar/Login/Login";
import Home from "./components/Homepage/Home";
import CustomerCare from "./components/Navbar/CustomerCare";
import RegisterPage from "./components/Navbar/Login/RegisterPage";
import Loginpage from "./components/Navbar/Login/Loginpage";
import Products from "./components/Products/Products";
import AuthProvider from "./components/auth";
import Profile from "./components/Navbar/Profile";
import Footer from "./components/Footer/Footer";
import { commerce } from "./lib/commerce";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import MenClothing from "./components/Products/MenClothing";
import WomenClothing from "./components/Products/WomenClothing";
import KidsClothing from "./components/Products/KidsClothing";
import HomeKitchen from "./components/Products/HomeKitchen";
import ProfileDetails from "./components/Navbar/ProfileDetails";
import LogoutPage from "./components/Navbar/LogoutPage";
import OrderHistory from "./components/Navbar/OrderHistory";
import Wishlist from "./components/Navbar/Wishlist";

// Define the main App component
function App() {
  // State variables
  const isAuthenticated = localStorage.getItem("loggedIn");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle search input
  const handleSearch = (input) => {
    setSearchInput(input);
    const results = performSearch(input);
    setSearchResults(results);
  };

  // Function to perform search logic
  const performSearch = () => {
    const results = products.filter((product) => {
      const productNameWords = product.name.split(" ");
      return productNameWords.some((word) =>
        searchInput.toLowerCase().includes(word.toLowerCase())
      );
    });

    return results;
  };

  // Function to fetch products from Commerce.js
  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list({
        limit: 100,
      });
      setProducts(data);
    } catch (error) {
      // Handle error if products cannot be retrieved
      console.error("Error retrieving products:", error);
      setError(error);
    }
  };

  // Function to fetch cart data from Commerce.js
  const fetchCart = async () => {
    try {
      const cartData = await commerce.cart.retrieve();
      setCart(cartData);
    } catch (error) {
      // Handle error if cart data cannot be retrieved
      console.error("Error retrieving cart data:", error);
      setError(error);
    }
  };

  // useEffect hook to fetch cart data when component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  // Function to add a product to the cart
  const addToCart = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.add(productId, quantity);
      setCart(cart);
    } catch (error) {
      // Handle error if product cannot be added to cart
      console.error("Error adding product to cart:", error);
      setError(error);
    }
  };

  // Function to update cart item quantity
  const handleUpdateCartQty = async (productId, quantity) => {
    try {
      const { cart } = await commerce.cart.update(productId, { quantity });
      setCart(cart);
    } catch (error) {
      // Handle error if cart item quantity cannot be updated
      console.error("Error updating cart item quantity:", error);
      setError(error);
    }
  };

  // Function to remove a product from the cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const { cart } = await commerce.cart.remove(productId);
      setCart(cart);
    } catch (error) {
      // Handle error if product cannot be removed from cart
      console.error("Error removing product from cart:", error);
      setError(error);
    }
  };

  // Function to empty the cart
  const handleEmptyCart = async () => {
    try {
      const { cart } = await commerce.cart.empty();
      setCart(cart);
    } catch (error) {
      // Handle error if cart cannot be emptied
      console.error("Error emptying cart:", error);
      setError(error);
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar
          totalItems={cart?.total_items}
          products={products}
          handleSearch={handleSearch}
          fetchCart={fetchCart}
        />
        <Routes>
          <Route path="/" element={<Home cart={cart} fetchCart={fetchCart}/>} />
          <Route path="customercare" element={<CustomerCare />} />
          {isAuthenticated ? (
            <Route path="/" element={<Home />} />
          ) : (
            <Route path="login" element={<Login />} />
          )}
          <Route path="registerpage" element={<RegisterPage />} />
          <Route path="loginpage" element={<Loginpage />} />
          <Route
            path="products"
            element={
              <Products
                products={products}
                fetchProducts={fetchProducts}
                searchItems={searchResults}
                fetchCart={fetchCart}
                cart={cart}
              />
            }
          />
          <Route path="women" element={<WomenClothing products={products} />} />
          <Route path="men" element={<MenClothing products={products} />} />
          <Route path="kids" element={<KidsClothing products={products} />} />
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileDetails />} />
            <Route path="wishlist" element={<Wishlist/>}/>
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="Logout" element={<LogoutPage />} />
          </Route>
          <Route
            path="/product/:productId"
            element={
              <ProductDetails
                onAddToCart={addToCart}
                fetchCart={fetchCart}
                cart={cart}
              />
            }
          />        
            <Route
              path="cart"
              element={
                <Cart
                  cart={cart}
                  handleUpdateCartQty={handleUpdateCartQty}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                  fetchCart={fetchCart}
                />
              }
            />
          <Route path="homeandkitchen" element={<HomeKitchen />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;

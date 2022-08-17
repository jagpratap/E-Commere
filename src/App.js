import { StrictMode, useEffect } from "react";

import "./global.scss";

import { useUserContext } from "./context/UserContext";

import Router from "./routes";
import commerce from "./lib/commerce";

const App = () => {
  const { setProducts, setCart } = useUserContext();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await commerce.products.list();
      setProducts(response.data);
    };
    const fetchCart = async () => {
      const response = await commerce.cart.retrieve();
      setCart(response);
    };
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <StrictMode>
      <Router />
    </StrictMode>
  );
};

export default App;

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Products from "./pages/products";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";

import Layout from "./layouts";

const routes = [
  {
    key: "PRODUCTS",
    path: "/products",
    exact: true,
    component: Products,
  },
  {
    key: "CART",
    path: "/cart",
    exact: true,
    component: Cart,
  },
  {
    key: "CHECKOUT",
    path: "/checkout",
    exact: true,
    component: Checkout,
  },
];

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        {routes.map(({
          component: Component,
          ...props
        }) => (
          <Route {...props} element={<Component />} />
        ))}
        {/* REDIRECT TO "/home" AS "/home" AND  "/" ARE SAME */}
        <Route path="/" exact element={<Navigate to="/products" />} />
        {/* PAGE NOT FOUND ROUTE */}
        <Route path="*" exact element={<div>Page Not Found</div>} />
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default Router;

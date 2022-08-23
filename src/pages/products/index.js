import { Helmet } from "react-helmet";

import Component from "../../components/app/products";

const Products = () => (
  <div>
    <Helmet title="Products" />
    <Component />
  </div>
);

export default Products;

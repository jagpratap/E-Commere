import { Helmet } from "react-helmet";

import Component from "../../components/app/checkout";

const Checkout = () => (
  <div>
    <Helmet title="Checkout" />
    <Component />
  </div>
);

export default Checkout;

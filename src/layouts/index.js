import { Helmet } from "react-helmet";

import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";

const Layout = ({ children }) => (
  <>
    <Helmet titleTemplate="E-Commerce | %s" />
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;

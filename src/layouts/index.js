import Header from "../components/layouts/header";
import Footer from "../components/layouts/footer";

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;

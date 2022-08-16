import { useEffect } from "react";

import { useUserContext } from "../../../context/UserContext";

import Product from "./product";
import commerce from "../../../lib/commerce";

const Products = () => {
  const { userProducts, setUserProducts, setUserCart } = useUserContext();
  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setUserCart(response);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setUserProducts(data);
    };
    const fetchCart = async () => {
      setUserCart(await commerce.cart.retrieve());
    };
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <div className="sm:container mx-auto my-5">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-items-center">
        {userProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
export default Products;

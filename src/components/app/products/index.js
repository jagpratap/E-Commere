import { useUserContext } from "../../../context/UserContext";

import Product from "./product";
import commerce from "../../../lib/commerce";

const Products = () => {
  const { products, setCart } = useUserContext();
  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity);
    setCart(response);
  };
  if (!products.length) return "Loading...";
  return (
    <div className="sm:container mx-auto my-5 min-h-[64vh]">
      <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-items-center">
        {products.map((product) => (
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

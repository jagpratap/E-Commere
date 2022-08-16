import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import commerce from "../../../lib/commerce";
import CartItem from "./cartItem";

const Cart = () => {
  const { userCart, setUserCart } = useUserContext();
  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setUserCart(response);
  };
  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setUserCart(response);
  };
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setUserCart(response);
  };
  if (!userCart.line_items) return "Loading...";
  return (
    <div className="sm:container mx-auto my-5">
      <div className="sm:text-start text-center text-3xl font-semibold mb-3">Your Shopping Cart</div>
      {!userCart.line_items.length ? (
        <div>
          You have no items in your shopping cart,
          {" "}
          <Link to="/" className="hover:text-blue-500">start adding some!</Link>
        </div>
      ) : (
        <>
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-items-center">
            {userCart.line_items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
          <div className="sm:flex justify-between items-center mt-6">
            <div className="font-semibold text-center sm:mb-0 mb-2">
              Subtotal:
              {" "}
              <b className="ml-1">{userCart.subtotal.formatted_with_symbol}</b>
            </div>
            <div className="flex justify-center sm:gap-5 gap-2">
              <button type="button" className="bg-red-500 hover:bg-red-600 active:bg-red-700 customButton" onClick={handleEmptyCart}>EMPTY CART</button>
              <button type="button" className="bg-blue-500 hover:bg-blue-600 customButton">
                <Link to="/checkout">CHECKOUT</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

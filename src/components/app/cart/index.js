import { Link } from "react-router-dom";

import { useUserContext } from "../../../context/UserContext";

import CartItem from "./cartItem";
import commerce from "../../../lib/commerce";

const Cart = () => {
  const { cart, setCart } = useUserContext();
  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response);
  };
  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response);
  };
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response);
  };
  if (!cart.line_items) return "Loading...";
  return (
    <div className="sm:container mx-auto my-5 min-h-[64vh]">
      <div className="sm:text-start text-center text-3xl font-semibold mb-3">Your Shopping Cart</div>
      {!cart.line_items.length ? (
        <div>
          You have no items in your shopping cart,
          {" "}
          <Link to="/" className="text-blue-500 hover:text-blue-700">start adding some!</Link>
        </div>
      ) : (
        <>
          <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 justify-items-center">
            {cart.line_items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateCartQty={handleUpdateCartQty}
                onRemoveFromCart={handleRemoveFromCart}
              />
            ))}
          </div>
          <div className="sm:flex items-center mt-6">
            <div className="font-semibold text-center sm:mb-0 mb-2">
              Subtotal:
              {" "}
              <b className="ml-1">{cart.subtotal.formatted_with_symbol}</b>
            </div>
            <div className="flex sm:ml-auto sm:mx-auto justify-center sm:gap-5 gap-2">
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

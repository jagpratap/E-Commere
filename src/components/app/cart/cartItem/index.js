import React from "react";

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => (
  <div className="border rounded shadow duration-100 hover:shadow-md w-60 sm:w-full h-70">
    <div className="h-40">
      <img src={item.image.url} alt="product_image" className="w-full h-full" />
    </div>
    <div className="px-4 py-2">
      <div className="flex justify-between">
        <h3 className="font-bold">{item.name}</h3>
        <b>{item.line_total.formatted_with_symbol}</b>
      </div>
      <div className="flex mt-5 justify-between items-center">
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="hover:bg-slate-200 rounded w-6 active:bg-slate-300"
            onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
          >
            -
          </button>
          <p className="text-sm px-0">{item.quantity}</p>
          <button
            type="button"
            className="hover:bg-slate-200 rounded w-6 active:bg-slate-300"
            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-600 active:bg-red-700 customButton"
          onClick={() => onRemoveFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;

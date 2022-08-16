const Product = ({ product, onAddToCart }) => (
  <div className="border rounded shadow duration-100 hover:shadow-md w-60 sm:w-full h-70">
    <div className="h-40">
      <img src={product.image.url} alt="product_image" className="w-full h-full" />
    </div>
    <div className="px-4 py-2">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{product.name}</h3>
          <small>{product.description.substr(3).slice(0, product.description.length - 7)}</small>
        </div>
        <b>{product.price.formatted_with_symbol}</b>
      </div>
      <div className="flex justify-end mt-5">
        <button type="button" aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
          <img src="./assets/images/CartPlus.svg" alt="CartPlus" className="w-5 active:w-4" />
        </button>
      </div>
    </div>
  </div>
);
export default Product;

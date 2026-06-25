import { useCart } from "../../context/CartContext";
import { showToast } from "../../utils/toast";

export function CartItem({ product }) {
  const { dispatch } = useCart();

  const handleReduce = () => {
    dispatch({ type: "REDUCE_PRODUCT", payload: product.id });
  };

  const handleDelete = () => {
    showToast("Removed product");
    dispatch({ type: "DELETE_PRODUCT", payload: product.id });
  };

  return (
    <div className="cart-product">
      <img src={product.image} alt={product.title} />
      <div className="cart-product-title">
        <small>Title</small>
        <h3>{product.title}</h3>
      </div>
      <div className="cart-product-amount">
        <small>Amount</small>
        <p className="amount">{product.quantity}</p>
      </div>
      <div className="cart-product-price">
        <small>Price</small>
        <p>${product.price}</p>
      </div>
      <div className="cart-product-subtotal">
        <small>Subtotal</small>
        <p>${product.price * product.quantity}</p>
      </div>
      <button className="cart-product-reduce" onClick={handleReduce}>
        Reduce amount
      </button>
      <button className="cart-product-delete" onClick={handleDelete}>
        <i className="bi bi-trash-fill"></i>
      </button>
    </div>
  );
}

import { useCart } from "../../context/CartContext";
import { confirmEmptyCart } from "../../utils/confirmDialog";

export function CartSummary({ total, onBuy }) {
  const { dispatch, totalItems } = useCart();

  const handleEmpty = async () => {
    const result = await confirmEmptyCart(totalItems);
    if (result.isConfirmed) {
      dispatch({ type: "EMPTY_CART" });
    }
  };

  return (
    <div className="cart-actions">
      <div className="cart-actions-left">
        <button className="cart-actions-empty" onClick={handleEmpty}>
          Empty cart
        </button>
      </div>
      <div className="cart-actions-right">
        <div className="cart-actions-total">
          <p>Total :</p>
          <p>${total}</p>
        </div>
        <button className="cart-actions-buy" onClick={onBuy}>
          Buy now
        </button>
      </div>
    </div>
  );
}

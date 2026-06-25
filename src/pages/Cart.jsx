import { useNavigate } from "react-router-dom";
import { CartList } from "../components/cart/CartList";
import { CartSummary } from "../components/cart/CartSummary";
import { EmptyCart } from "../components/cart/EmptyCart";
import { useCart } from "../context/CartContext";

export function Cart() {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <h2 className="main-title">Cart</h2>
      <div className="cart-container">
        {cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <CartList items={cart} />
            <br />
            <CartSummary
              total={totalPrice}
              onBuy={() => navigate("/checkout")}
            />
          </>
        )}
      </div>
    </>
  );
}

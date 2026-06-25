import { useState } from "react";
import { Navigate } from "react-router-dom";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { PaymentForm } from "../components/checkout/PaymentForm";
import { PaymentSuccess } from "../components/checkout/PaymentSuccess";
import { useCart } from "../context/CartContext";

export function Checkout() {
  const { cart, dispatch, totalPrice } = useCart();
  const [transaction, setTransaction] = useState(null);

  // Si el carrito está vacío y no hay transacción aprobada,
  // no tiene sentido estar en /checkout → redirigir al carrito
  if (cart.length === 0 && !transaction) {
    return <Navigate to="/cart" replace />;
  }

  function handleSuccess(result) {
    dispatch({ type: "EMPTY_CART" });
    setTransaction(result);
  }

  if (transaction) {
    return (
      <PaymentSuccess
        transactionId={transaction.transactionId}
        approvedAt={transaction.approvedAt}
      />
    );
  }

  return (
    <>
      <h2 className="main-title">Checkout</h2>
      <div className="checkout-container">
        <OrderSummary cart={cart} totalPrice={totalPrice} />
        <PaymentForm onSuccess={handleSuccess} />
      </div>
    </>
  );
}
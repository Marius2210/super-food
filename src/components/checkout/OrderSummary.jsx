export function OrderSummary({ cart, totalPrice }) {
  return (
    <div className="order-summary">
      <h3 className="order-summary-title">Order summary</h3>

      <ul className="order-summary-list">
        {cart.map((item) => (
          <li key={item.id} className="order-summary-item">
            <img src={item.image} alt={item.title} />
            <span className="order-summary-item-title">{item.title}</span>
            <span className="order-summary-item-qty">x{item.quantity}</span>
            <span className="order-summary-item-price">
              ${item.price * item.quantity}
            </span>
          </li>
        ))}
      </ul>

      <div className="order-summary-total">
        <span>Total</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
}
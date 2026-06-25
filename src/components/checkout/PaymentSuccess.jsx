import { Link } from "react-router-dom";

export function PaymentSuccess({ transactionId, approvedAt }) {
  const formattedDate = new Date(approvedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="payment-success">
      <div className="payment-success-icon">
        <i className="bi bi-check-circle-fill"></i>
      </div>

      <h2>Payment approved!</h2>
      <p>Thank you for your purchase. Your order is being prepared.</p>

      <div className="payment-success-details">
        <div className="payment-success-detail">
          <span>Transaction ID</span>
          <strong>{transactionId}</strong>
        </div>
        <div className="payment-success-detail">
          <span>Date</span>
          <strong>{formattedDate}</strong>
        </div>
      </div>

      <Link to="/" className="back-home-button">
        <i className="bi bi-bag"></i>
        Keep shopping
      </Link>
    </div>
  );
}
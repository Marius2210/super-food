import { useCheckout } from "../../hooks/useCheckout";

export function PaymentForm({ onSuccess }) {
  const { form, errors, status, paymentError, handleChange, handleSubmit } =
    useCheckout(onSuccess);

  const isLoading = status === "loading";

  return (
    <div className="payment-form-wrapper">
      <h3 className="payment-form-title">
        <i className="bi bi-credit-card"></i> Payment details
      </h3>

      <div className="payment-form">

        {/* Nombre del titular */}
        <div className="field-group">
          <label htmlFor="cardName">Cardholder name</label>
          <input
            id="cardName"
            name="cardName"
            type="text"
            placeholder="Name as it appears on card"
            value={form.cardName}
            onChange={handleChange}
            disabled={isLoading}
            className={errors.cardName ? "input-error" : ""}
          />
          {errors.cardName && (
            <p className="field-error">{errors.cardName}</p>
          )}
        </div>

        {/* Número de tarjeta */}
        <div className="field-group">
          <label htmlFor="cardNumber">Card number</label>
          <div className="card-number-wrapper">
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.cardNumber ? "input-error" : ""}
              inputMode="numeric"
            />
            <i className="bi bi-credit-card card-icon"></i>
          </div>
          {errors.cardNumber && (
            <p className="field-error">{errors.cardNumber}</p>
          )}
        </div>

        {/* Vencimiento y CVV en la misma fila */}
        <div className="field-row">
          <div className="field-group">
            <label htmlFor="expiryDate">Expiry date</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={form.expiryDate}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.expiryDate ? "input-error" : ""}
              inputMode="numeric"
            />
            {errors.expiryDate && (
              <p className="field-error">{errors.expiryDate}</p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="password"
              placeholder="•••"
              value={form.cvv}
              onChange={handleChange}
              disabled={isLoading}
              className={errors.cvv ? "input-error" : ""}
              inputMode="numeric"
            />
            {errors.cvv && (
              <p className="field-error">{errors.cvv}</p>
            )}
          </div>
        </div>

        {/* Error de pago rechazado */}
        {status === "error" && (
          <div className="payment-error">
            <i className="bi bi-exclamation-circle"></i>
            <p>{paymentError}</p>
          </div>
        )}

        {/* Botón de pago */}
        <button
          className="pay-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Processing payment...
            </>
          ) : (
            <>
              <i className="bi bi-lock-fill"></i>
              Pay now
            </>
          )}
        </button>

        <p className="payment-secure-note">
          <i className="bi bi-shield-check"></i>
          Your payment is simulated. No real charges will be made.
        </p>
      </div>
    </div>
  );
}
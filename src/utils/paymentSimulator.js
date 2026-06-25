export function simulatePayment({ cardNumber, expiryDate, cvv, cardName }) {
  return new Promise((resolve, reject) => {
 
    // Simular latencia de red (2 segundos)
    setTimeout(() => {
 
      // Validaciones básicas de formato
      if (cardNumber.replace(/\s/g, "").length !== 16) {
        return reject({ code: "INVALID_CARD", message: "Card number is not valid." });
      }
 
      if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        return reject({ code: "INVALID_EXPIRY", message: "Expiry date is not valid." });
      }
 
      if (cvv.length < 3) {
        return reject({ code: "INVALID_CVV", message: "CVV is not valid." });
      }
 
      if (!cardName.trim()) {
        return reject({ code: "INVALID_NAME", message: "Cardholder name is required." });
      }
 
      // Simular fallo aleatorio (10% de probabilidad)
      if (Math.random() < 0.1) {
        return reject({ code: "PAYMENT_DECLINED", message: "Payment was declined. Please try again." });
      }
 
      // Pago aprobado
      resolve({
        transactionId: `TXN-${Date.now()}`,
        approvedAt: new Date().toISOString(),
      });
 
    }, 2000);
  });
}
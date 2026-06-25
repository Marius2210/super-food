import { useState } from "react";
import { simulatePayment } from "../utils/paymentSimulator";

const INITIAL_FORM = {
  cardName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

const INITIAL_ERRORS = {
  cardName: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

// Formatea el número de tarjeta en grupos de 4: "1234 5678 9012 3456"
function formatCardNumber(value) {
  return value
    .replace(/\D/g, "")         // solo dígitos
    .slice(0, 16)                // máximo 16
    .replace(/(.{4})/g, "$1 ")  // agrega espacio cada 4
    .trim();
}

// Formatea vencimiento como "MM/YY"
function formatExpiry(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 4)
    .replace(/^(\d{2})(\d)/, "$1/$2");
}

export function useCheckout(onSuccess) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [paymentError, setPaymentError] = useState("");

  // Maneja cambios de cada campo con formateo automático
  function handleChange(e) {
    const { name, value } = e.target;

    let formatted = value;
    if (name === "cardNumber") formatted = formatCardNumber(value);
    if (name === "expiryDate") formatted = formatExpiry(value);
    if (name === "cvv") formatted = value.replace(/\D/g, "").slice(0, 4);

    setForm((prev) => ({ ...prev, [name]: formatted }));

    // Limpiar el error del campo cuando el usuario empieza a corregirlo
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  // Validación antes de enviar
  function validate() {
    const newErrors = { ...INITIAL_ERRORS };
    let isValid = true;

    if (!form.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required.";
      isValid = false;
    }

    if (form.cardNumber.replace(/\s/g, "").length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits.";
      isValid = false;
    }

    if (!form.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      newErrors.expiryDate = "Use MM/YY format.";
      isValid = false;
    }

    if (form.cvv.length < 3) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    setStatus("loading");
    setPaymentError("");

    try {
      const result = await simulatePayment(form);
      onSuccess(result); // llama al callback con la info de la transacción
    } catch (err) {
      setStatus("error");
      setPaymentError(err.message);
    }
  }

  return { form, errors, status, paymentError, handleChange, handleSubmit };
}
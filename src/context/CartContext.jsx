import { createContext, useContext, useEffect, useReducer } from "react";

/* Contexto global donde componente del árbol puede recibir datos sin pasarlos prop a prop */

const CartContext = createContext(null);
const STORAGE_KEY = "products-in-cart";

// Método donde manejamos todos los estados del carrito (agregar, reducir, eliminar y vaciar)
function cartReducer(array, action) {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const exists = array.find((p) => p.id === action.payload.id);
      if (exists) {
        return array.map((p) =>
          p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...array, { ...action.payload, quantity: 1 }];
    }
    case "REDUCE_PRODUCT": {
      const product = array.find((p) => p.id === action.payload);
      if (!product) return array;
      if (product.quantity <= 1) {
        return array.filter((p) => p.id !== action.payload);
      }
      return array.map((p) =>
        p.id === action.payload ? { ...p, quantity: p.quantity - 1 } : p
      );
    }
    case "DELETE_PRODUCT":
      return array.filter((p) => p.id !== action.payload);
    case "EMPTY_CART":
      return [];
    default:
      return array;
  }
}

// Leer el localstorage solo una vez al inicio cuando el componente se monta
function getInitialCart() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Provider - conecta todo
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrice = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, dispatch, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para encapsular useContext y CartContext
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

import Toastify from "toastify-js";

export function showToast(text) {
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#f60",
      borderRadius: "2rem",
    },
    offset: { x: "2rem", y: "1.5rem" },
  }).showToast();
}

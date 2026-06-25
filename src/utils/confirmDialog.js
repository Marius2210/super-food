import Swal from "sweetalert2";

export function confirmEmptyCart(itemCount) {
  return Swal.fire({
    title: "Are you sure?",
    icon: "question",
    background: "#fff",
    color: "#f60",
    html: `${itemCount} products will be deleted`,
    showCancelButton: true,
    confirmButtonColor: "#f60",
    cancelButtonColor: "#f60",
    focusConfirm: false,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });
}

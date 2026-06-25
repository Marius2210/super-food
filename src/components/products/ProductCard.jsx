import { useCart } from "../../context/CartContext";
import { showToast } from "../../utils/toast";

export function ProductCard({ product }) {
  const { dispatch } = useCart();

  const handleAdd = () => {
    dispatch({ type: "ADD_PRODUCT", payload: product });
    showToast("Added product");
  };

  return (
    <div className="product">
      <img className="product-img" src={product.image} alt={product.title} />
      <div className="product-details">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price}</p>
        <button className="add-product" onClick={handleAdd}>
          Add
        </button>
      </div>
    </div>
  );
}

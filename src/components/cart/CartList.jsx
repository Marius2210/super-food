import { CartItem } from "./CartItem";

export function CartList({ items }) {
  return (
    <div className="cart-products">
      {items.map((item) => (
        <CartItem key={item.id} product={item} />
      ))}
    </div>
  );
}

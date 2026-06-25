import { NavLink, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../constants/categories";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";

export function Sidebar({ isVisible, onClose, category, onCategoryChange }) {
  const { pathname } = useLocation();
  const { totalItems } = useCart();
  const { theme, toggleTheme } = useTheme();
  const isCartPage = pathname === "/cart";
  const isDark = theme === "dark";

  return (
    <aside className={isVisible ? "aside-visible" : ""}>
      <header>
        <h1 className="logo">Super Food</h1>
      </header>
      <button className="close-menu" onClick={onClose}>
        <i className="bi bi-x"></i>
      </button>
      <nav>
        <ul className="menu">
          {isCartPage ? (
            <li>
              <NavLink to="/" className="button-back" onClick={onClose}>
                <i className="bi bi-arrow-return-left"></i>
                Keep buying
              </NavLink>
            </li>
          ) : (
            CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <button
                  className={`category-button ${
                    category === cat.id ? "active" : ""
                  }`}
                  onClick={() => {
                    onCategoryChange(cat.id);
                    onClose();
                  }}
                >
                  <i className={`bi ${cat.icon}`}></i>
                  {cat.label}
                </button>
              </li>
            ))
          )}
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) => `cart ${isActive ? "active" : ""}`}
            >
              <i className="bi bi-cart-fill"></i>
              Cart <span className="number">{totalItems}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <footer>
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className={`bi ${isDark ? "bi-sun-fill" : "bi-moon-fill"}`}></i>
          {isDark ? "Light mode" : "Dark mode"}
        </button>
        <p className="text-footer">© Super Food</p>
      </footer>
    </aside>
  );
}

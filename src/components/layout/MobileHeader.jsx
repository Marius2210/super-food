export function MobileHeader({ onOpenMenu }) {
  return (
    <header className="mobile-header">
      <h1 className="logo">Super Food</h1>
      <button className="open-menu" onClick={onOpenMenu}>
        <i className="bi bi-list"></i>
      </button>
    </header>
  );
}

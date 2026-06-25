import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("all");

  return (
    <div className="wrapper">
      <MobileHeader onOpenMenu={() => setMenuOpen(true)} />
      <Sidebar
        isVisible={menuOpen}
        onClose={() => setMenuOpen(false)}
        category={category}
        onCategoryChange={setCategory}
      />
      <main>
        {/* Home lee `category` con useOutletContext(); Cart simplemente la ignora */}
        <Outlet context={{ category }} />
      </main>
    </div>
  );
}

import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CATEGORIES } from "../constants/categories";
import { ProductGrid } from "../components/products/ProductGrid";
import { SearchBar } from "../components/products/SearchBar";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import { useProducts } from "../hooks/useProducts";

export function Home() {
  const { category } = useOutletContext();
  const { products } = useProducts();
  const [search, setSearch] = useState("");

  const filtered = useFilteredProducts(products, category, search);
  const title = CATEGORIES.find((c) => c.id === category)?.label ?? "All products";

  return (
    <>
      <h2 className="main-title">{title}</h2>
      <br />
      <SearchBar value={search} onChange={setSearch} />
      <br />
      <br />
      <ProductGrid products={filtered} />
    </>
  );
}

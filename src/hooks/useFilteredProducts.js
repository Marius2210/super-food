import { useMemo } from "react";

export function useFilteredProducts(products, category, search) {
  return useMemo(() => {
    return products
      .filter((p) => category === "all" || p.category.id === category)
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  }, [products, category, search]);
}

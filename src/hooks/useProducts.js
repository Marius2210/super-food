import { products } from "../data/products";

// Hoy los datos son un array estático importado, pero mantenemos la misma
// forma de retorno (products/loading/error) que tendría un hook que hace
// fetch a una API real, para que el cambio futuro sea de un solo archivo.
export function useProducts() {
  return { products, loading: false, error: null };
}

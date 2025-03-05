import { getProductById } from "@/core/products/actions/get-product-by-id";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  const productQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return { productQuery };
};

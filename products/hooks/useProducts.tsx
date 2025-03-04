import { getProducts } from "@/core/products/actions/get-products";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = () => {
  const productsQuery = useInfiniteQuery({
    queryKey: ["products", "infinite"],
    queryFn: ({ pageParam }) => getProducts(20, pageParam * 20),
    staleTime: 1000 * 60 * 60, // 1 hour
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return pages.length;
    },
  });

  return {
    productsQuery,
    loadNextPage: productsQuery.fetchNextPage
  };
};

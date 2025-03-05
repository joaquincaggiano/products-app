import { createUpdateProduct } from "@/core/products/actions/create-update-product";
import { getProductById } from "@/core/products/actions/get-product-by-id";
import { Product } from "@/core/products/interfaces/product";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useProduct = (id: string) => {
  const productQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const productMutation = useMutation({
    mutationFn: async (data: Product) => createUpdateProduct(data),
    onSuccess: (data: Product) => {
      Alert.alert(
        `Producto guardado`,
        `El producto ${data.title} se ha guardado correctamente`
      );
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  return { productQuery, productMutation };
};

import { useCameraStore } from "@/camera/store/useCameraStore";
import { createUpdateProduct } from "@/core/products/actions/create-update-product";
import { getProductById } from "@/core/products/actions/get-product-by-id";
import { Product } from "@/core/products/interfaces/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { Alert } from "react-native";

export const useProduct = (id: string) => {
  const { clearSelectedImages } = useCameraStore();

  const queryClient = useQueryClient();
  const productIdRef = useRef(id); // puede ser new o uuid

  const productQuery = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const productMutation = useMutation({
    mutationFn: async (data: Product) =>
      createUpdateProduct({
        ...data,
        id: productIdRef.current,
      }),
    onSuccess: (data: Product) => {
      productIdRef.current = data.id;

      clearSelectedImages();

      queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
      queryClient.invalidateQueries({ queryKey: ["products", id] });
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

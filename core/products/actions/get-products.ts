import { API_URL, productsApi } from "@/core/api/productsApi";
import { type Product } from "../interfaces/product";

export const getProducts = async (limit: number = 20, offset: number = 0) => {
  try {
    const { data } = await productsApi.get<Product[]>("/products", {
      params: {
        limit,
        offset,
      },
    });
    return data.map((product) => {
      return {
        ...product,
        images: product.images.map((image) => {
          return `${API_URL}/files/product/${image}`;
        }),
      };
    });
  } catch (error) {
    throw new Error("Error al obtener productos");
  }
};

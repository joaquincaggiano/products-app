import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/product";

const emptyProduct: Product = {
  id: "",
  title: "",
  description: "",
  price: 0,
  images: [],
  slug: "",
  gender: Gender.Men,
  sizes: [],
  stock: 0,
  tags: [],
};

export const getProductById = async (id: string): Promise<Product> => {
  if (id === "new") {
    return emptyProduct;
  }

  try {
    const { data } = await productsApi.get<Product>(`/products/${id}`);

    return {
      ...data,
      images: data.images.map((image) => {
        return `${API_URL}/files/product/${image}`;
      }),
    };
  } catch (error) {
    throw new Error("Error al obtener el producto");
  }
};

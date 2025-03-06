import { productsApi } from "@/core/api/productsApi";
import { Product } from "../interfaces/product";

export const createUpdateProduct = async (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== "new") {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = async (images: string[]): Promise<string[]> => {

  // Esto es así porque Fernando en el curso de NestJS espera que la imagen venga como file de nombre
  const fileImages = images.filter((image) => image.startsWith("file"));
  const currentImages = images.filter((image) => !image.startsWith("file"));

  if (fileImages.length > 0) {
    const uploadedImages = await Promise.all(fileImages.map(uploadImages));

    currentImages.push(...uploadedImages);
  }

  return currentImages.map((img) => img.split("/").pop()!);
}

const uploadImages = async (image: string): Promise<string> => {
  const formData = new FormData() as any;

  formData.append("file", {
    uri: image,
    name: image.split("/").pop()!,
    type: "image/jpeg",
  });

  const { data } = await productsApi.post<{image: string}>("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });

  return data.image;
}

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...productData } = product;

  try {
    const checkedImages = await prepareImages(images);

    const { data } = await productsApi.patch<Product>(`/products/${id}`, {
      ...productData,
      images: checkedImages,
    });

    return data;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

const createProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...productData } = product;

  try {
    const checkedImages = await prepareImages(images);

    const { data } = await productsApi.post<Product>(`/products`, {
      ...productData,
      images: checkedImages,
    });

    return data;
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

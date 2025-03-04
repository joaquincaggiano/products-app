import { Product } from "@/core/products/interfaces/product";
import { View, Text, FlatList, RefreshControl } from "react-native";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    queryClient.invalidateQueries({ queryKey: ["products", "infinite"] });
    setRefreshing(false);
  };

  return (
    <FlatList
      data={products}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductList;

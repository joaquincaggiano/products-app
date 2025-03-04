import ProductList from "@/products/components/ProductList";
import { useProducts } from "@/products/hooks/useProducts";
import Loading from "@/shared/components/Loading";
import { View } from "react-native";

const HomeScreen = () => {
  const { productsQuery, loadNextPage } = useProducts();

  if (productsQuery.isLoading) {
    return <Loading />;
  }

  return (
    <View className="px-5">
      <ProductList
        products={productsQuery.data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
    </View>
  );
};

export default HomeScreen;

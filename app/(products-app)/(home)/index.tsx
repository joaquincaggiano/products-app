import ProductList from "@/products/components/ProductList";
import { useProducts } from "@/products/hooks/useProducts";
import Loading from "@/shared/components/Loading";
import { FAB } from "@/theme/components/FAB";
import { router } from "expo-router";
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

      <FAB
        iconName="add-circle-outline"
        onPress={() => router.push("/product/new")}
      />
    </View>
  );
};

export default HomeScreen;

import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { ThemedView } from "@/theme/components/ThemedView";
import { ThemedText } from "@/theme/components/ThemedText";
import ThemedTextInput from "@/theme/components/ThemedTextInput";
import { useProduct } from "@/products/hooks/useproduct";
import Loading from "@/shared/components/Loading";
import ProductImages from "@/products/components/ProductImages";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();
  const primaryColor = useThemeColor({}, "primary");

  const { productQuery } = useProduct(id as string);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="camera-outline" size={24} color={primaryColor} />
      ),
    });
  }, []);

  useEffect(() => {
    if (productQuery.data) {
      navigation.setOptions({
        title: productQuery.data.title,
      });
    }
  }, [productQuery.data]);

  if (productQuery.isLoading) {
    return <Loading />;
  }

  if (!productQuery.data) {
    return <Redirect href="/" />;
  }

  const product = productQuery.data;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
        <ProductImages images={product.images} />

        <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
          <ThemedTextInput placeholder="Título" className="my-2" />
          <ThemedTextInput placeholder="Slug" className="my-2" />
          <ThemedTextInput
            placeholder="Descripción"
            multiline
            numberOfLines={5}
            className="my-2"
          />
        </ThemedView>

        <ThemedView
          style={{
            marginHorizontal: 10,
            marginVertical: 5,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <ThemedTextInput placeholder="Precio" className="flex-1" />
          <ThemedTextInput placeholder="Inventario" className="flex-1" />
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;

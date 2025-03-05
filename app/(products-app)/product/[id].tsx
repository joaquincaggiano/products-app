import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import {
  Redirect,
  router,
  useLocalSearchParams,
  useNavigation,
} from "expo-router";
import { ThemedView } from "@/theme/components/ThemedView";
import ThemedTextInput from "@/theme/components/ThemedTextInput";
import Loading from "@/shared/components/Loading";
import ProductImages from "@/products/components/ProductImages";
import ThemedButtonGroup from "@/theme/components/ThemedButtonGroup";
import ThemedButton from "@/theme/components/ThemedButton";
import { useProduct } from "@/products/hooks/useProduct";
import { Formik } from "formik";
import { Size } from "@/core/products/interfaces/product";
import MenuIconButton from "@/theme/components/MenuIconButton";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { productQuery, productMutation } = useProduct(id as string);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuIconButton
          onPress={() => router.push("/camera")}
          icon="camera-outline"
        />
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
    <Formik
      initialValues={product}
      onSubmit={(productLike) => productMutation.mutate(productLike)}
    >
      {({ values, handleSubmit, handleChange, setFieldValue }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView>
            <ProductImages images={values.images} />

            <ThemedView style={{ marginHorizontal: 10, marginTop: 20 }}>
              <ThemedTextInput
                placeholder="Título"
                className="my-2"
                value={values.title}
                onChangeText={handleChange("title")}
              />
              <ThemedTextInput
                placeholder="Slug"
                className="my-2"
                value={values.slug}
                onChangeText={handleChange("slug")}
              />
              <ThemedTextInput
                placeholder="Descripción"
                multiline
                numberOfLines={5}
                className="my-2"
                value={values.description}
                onChangeText={handleChange("description")}
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
              <ThemedTextInput
                placeholder="Precio"
                className="flex-1"
                value={values.price.toString()}
                onChangeText={handleChange("price")}
              />
              <ThemedTextInput
                placeholder="Inventario"
                className="flex-1"
                value={values.stock.toString()}
                onChangeText={handleChange("stock")}
              />
            </ThemedView>

            <ThemedView style={{ marginHorizontal: 10 }}>
              <ThemedButtonGroup
                options={["XS", "S", "M", "L", "XL", "XXL", "XXXL"]}
                selectedOptions={values.sizes}
                onSelect={(option) => {
                  const newSizes = values.sizes.includes(option as Size)
                    ? values.sizes.filter((size) => size !== option)
                    : [...values.sizes, option];

                  setFieldValue("sizes", newSizes);
                }}
              />

              <ThemedButtonGroup
                options={["kid", "men", "women", "unisex"]}
                selectedOptions={[values.gender]}
                onSelect={(option) => setFieldValue("gender", option)}
              />
            </ThemedView>

            <ThemedView
              style={{ marginHorizontal: 10, marginBottom: 50, marginTop: 20 }}
            >
              <ThemedButton onPress={() => handleSubmit()} icon="save-outline">
                Guardar
              </ThemedButton>
            </ThemedView>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ProductScreen;

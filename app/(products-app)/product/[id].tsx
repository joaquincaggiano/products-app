import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { ThemedView } from "@/theme/components/ThemedView";
import { ThemedText } from "@/theme/components/ThemedText";
import ThemedTextInput from "@/theme/components/ThemedTextInput";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const primaryColor = useThemeColor({}, "primary");

  useEffect(() => {
    navigation.setOptions({
      title: "Product",
      headerRight: () => (
        <Ionicons name="camera-outline" size={24} color={primaryColor} />
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView>
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

import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const ProductScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ProductScreen</Text>
    </View>
  );
};

export default ProductScreen;

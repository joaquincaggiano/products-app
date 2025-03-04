import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { ActivityIndicator, View } from "react-native";

const Loading = () => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" color={primaryColor} />
    </View>
  );
};

export default Loading;

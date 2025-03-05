import { useThemeColor } from "@/theme/hooks/useThemeColor";
import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface Props {
  onPress: () => void;
}

const ShutterButton = ({ onPress }: Props) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      style={[
        styles.shutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  shutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ShutterButton;

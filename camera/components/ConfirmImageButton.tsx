import { useThemeColor } from "@/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

interface Props {
  onPress: () => void;
}

const ConfirmImageButton = ({ onPress }: Props) => {
  const dimensions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      style={[
        styles.confirmImageButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimensions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  confirmImageButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ConfirmImageButton;

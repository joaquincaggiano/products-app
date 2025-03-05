import { Ionicons } from "@expo/vector-icons";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { useThemeColor } from "@/theme/hooks/useThemeColor";

interface Props {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const MenuIconButton = ({ onPress, icon, size = 24, color, style }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Ionicons name={icon} size={size} color={color || primaryColor} />
    </TouchableOpacity>
  );
};

export default MenuIconButton;

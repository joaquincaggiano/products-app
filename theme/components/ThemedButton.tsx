import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends TouchableOpacityProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...props }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity
      style={{ backgroundColor: primaryColor }}
      className="px-2 py-4 rounded-md flex-row items-center justify-center gap-2"
      {...props}
    >
      <Text className="text-white text-center font-kanit text-lg">
        {children}
      </Text>
      {icon && <Ionicons name={icon} size={24} color="white" />}
    </TouchableOpacity>
  );
};

export default ThemedButton;

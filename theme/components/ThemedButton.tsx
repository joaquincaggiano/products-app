import { Ionicons } from "@expo/vector-icons";
import { Text, Pressable, PressableProps } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...props }: Props) => {
  const primary = useThemeColor({}, "primary");

  return (
    <Pressable
      //   style={({ pressed }) => ({
      //     backgroundColor: pressed ? primary + "90" : primary,
      //   })}
      style={{ backgroundColor: primary }}
      className="px-2 py-4 rounded-md flex-row items-center justify-center gap-2"
      {...props}
    >
      <Text className="text-white text-center font-kanit text-lg">
        {children}
      </Text>
      {icon && <Ionicons name={icon} size={24} color="white" />}
    </Pressable>
  );
};

export default ThemedButton;

import { View, Text, TextInputProps, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";
import { useRef, useState } from "react";
interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({ icon, ...props }: Props) => {
  const primary = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);

  return (
    <View
      className="flex-row items-center gap-3 border rounded-md p-2"
      style={{ borderColor: isFocused ? primary : "#ccc" }}
      onTouchStart={() => inputRef.current?.focus()}
    >
      {icon && <Ionicons name={icon} size={24} color={textColor} />}
      <TextInput
        {...props}
        ref={inputRef}
        placeholderTextColor="#5c5c5c"
        style={{ color: textColor }}
        className="flex-1"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

export default ThemedTextInput;

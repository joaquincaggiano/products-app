import { View, Text, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <View className="flex-1 flex-row justify-center items-center">
      {options.map((option) => {
        return (
          <TouchableOpacity
            key={option}
            onPress={() => onSelect(option)}
            className="flex-1 p-2 m-1 rounded-md items-center justify-center"
            style={{
              backgroundColor: selectedOptions.includes(option)
                ? primaryColor
                : "transparent",
            }}
          >
            <ThemedText
              adjustsFontSizeToFit
              numberOfLines={1}
              className="text-base"
              style={{
                color: selectedOptions.includes(option) ? "white" : "black",
              }}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ThemedButtonGroup;

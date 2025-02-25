import { View, Text, TextInputProps, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedTextInput = ({icon, ...props}: Props) => {
  return (
    <View className="flex-row items-center gap-2 border border-gray-300 rounded-md p-2">
      {icon && <Ionicons name={icon} size={24} color="gray" />}
      <TextInput
        {...props}
        className="flex-1"
      />
    </View>
  )
}

export default ThemedTextInput
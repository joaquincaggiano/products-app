import { ThemedText } from '@/theme/components/ThemedText'
import { View } from 'react-native'

const HomeScreen = () => {
  return (
    <View className='pt-20 py-5'>
      <ThemedText className='text-3xl font-kanitBold'>HomeScreen</ThemedText>
      <ThemedText className='text-2xl font-kanitRegular'>HomeScreen</ThemedText>
      <ThemedText className='text-xl font-kanitThin'>HomeScreen</ThemedText>
    </View>
  )
}

export default HomeScreen
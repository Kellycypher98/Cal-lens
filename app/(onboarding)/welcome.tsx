import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();
  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-2xl font-bold">Welcome to Cal-Lens!</Text>
      <TouchableOpacity className="mt-6 bg-blue-500 px-6 py-3 rounded-full" onPress={() => router.push('/(onboarding)/details')}>
        <Text className="text-white font-semibold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
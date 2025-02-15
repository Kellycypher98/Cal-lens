import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../store/onboardingStore';

export default function ActivityScreen() {
  const router = useRouter();
  const { setUserData } = useOnboardingStore();

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-xl font-bold mb-4">Select your activity level</Text>
      <Pressable className="mb-3 bg-gray-200 p-3 rounded" onPress={() => setUserData({ activityLevel: 'Low' })}>
        <Text>Low</Text>
      </Pressable>
      <Pressable className="mb-3 bg-gray-200 p-3 rounded" onPress={() => setUserData({ activityLevel: 'Medium' })}>
        <Text>Medium</Text>
      </Pressable>
      <Pressable className="mb-6 bg-gray-200 p-3 rounded" onPress={() => setUserData({ activityLevel: 'High' })}>
        <Text>High</Text>
      </Pressable>
      <Pressable className="bg-blue-500 px-6 py-3 rounded-full" onPress={() => router.push('/(onboarding)/summary')}>
        <Text className="text-white font-semibold">Next</Text>
      </Pressable>
    </View>
  );
}

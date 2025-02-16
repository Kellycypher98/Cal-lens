import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../store/onboardingStore';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ActivityScreen() {
  const router = useRouter();
  const { setUserData } = useOnboardingStore();

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-xl font-bold mb-4">How many times do you train per week?</Text>
        <Pressable className="mb-3 bg-gray-200 p-3 rounded" onPress={() => setUserData({ activityLevel: '1-2 times' })}>
          <Text>1-2 times</Text>
        </Pressable>
        <Pressable className="mb-3 bg-gray-200 p-3 rounded" onPress={() => setUserData({ activityLevel: '3-4 times' })}>
          <Text>3-4 times</Text>
        </Pressable>
        <Pressable className="mb-6 bg-gray-200 p-3 rounded" onPress={() => setUserData({ activityLevel: '5+ times' })}>
          <Text>5+ times</Text>
        </Pressable>
        <Pressable className="bg-blue-500 px-6 py-3 rounded-full" onPress={() => router.push('/(onboarding)/summary')}>
          <Text className="text-white font-semibold">Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../store/onboardingStore';

export default function SummaryScreen() {
  const router = useRouter();
  const { age, height, weight, activityLevel, completeOnboarding } = useOnboardingStore();

  const finishOnboarding = async () => {
    await completeOnboarding();
    router.replace('/home');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center bg-white px-6">
        <Text className="text-2xl font-bold mb-2">Almost there!</Text>
        <Text className="text-gray-500 mb-8">Here's a summary of your profile</Text>

        <View className="bg-gray-100 rounded-2xl p-6 space-y-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Age</Text>
            <Text className="text-black font-semibold">{age} years</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Height</Text>
            <Text className="text-black font-semibold">{height} cm</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Weight</Text>
            <Text className="text-black font-semibold">{weight} kg</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <Text className="text-gray-500">Activity Level</Text>
            <Text className="text-black font-semibold">{activityLevel}</Text>
          </View>
        </View>

        <Pressable 
          className="mt-8 bg-black px-6 py-4 rounded-2xl items-center" 
          onPress={finishOnboarding}
        >
          <Text className="text-white font-semibold text-lg">Let's Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

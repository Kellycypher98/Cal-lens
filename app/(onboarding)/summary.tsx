import { View, Text, Pressable } from 'react-native';
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
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-xl font-bold mb-4">Summary</Text>
      <Text>Age: {age}</Text>
      <Text>Height: {height} cm</Text>
      <Text>Weight: {weight} kg</Text>
      <Text>Activity Level: {activityLevel}</Text>
      <Pressable className="mt-6 bg-green-500 px-6 py-3 rounded-full" onPress={finishOnboarding}>
        <Text className="text-white font-semibold">Finish</Text>
      </Pressable>
    </View>
  );
}

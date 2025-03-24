import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../store/onboardingStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const goals = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    description: 'I want to lose weight and get fit'
  },
  {
    id: 'muscle-gain', 
    title: 'Muscle Gain',
    description: 'I want to build muscle and get stronger'
  },
  {
    id: 'general-fitness',
    title: 'General Fitness', 
    description: 'I want to improve my overall fitness and health'
  }
];

export default function GoalScreen() {
  const router = useRouter();
  const { setUserData } = useOnboardingStore();
  const [selectedGoal, setSelectedGoal] = useState('');

  const handleContinue = () => {
    if (selectedGoal) {
      setUserData({ goal: selectedGoal });
      router.push('/(onboarding)/summary');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-1 justify-center bg-white px-6">
        <Text className="text-2xl font-bold mb-2">What's your goal?</Text>
        <Text className="text-gray-500 mb-8">Choose your primary fitness goal</Text>

        {goals.map((goal) => (
          <Pressable
            key={goal.id}
            className={`mb-4 p-6 rounded-2xl active:bg-gray-200 ${selectedGoal === goal.id ? 'bg-black' : 'bg-gray-100'}`}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <Text className={`text-lg font-semibold ${selectedGoal === goal.id ? 'text-white' : 'text-black'}`}>
              {goal.title}
            </Text>
            <Text className={`${selectedGoal === goal.id ? 'text-gray-300' : 'text-gray-500'}`}>
              {goal.description}
            </Text>
          </Pressable>
        ))}

        <Pressable
          className={`mt-4 px-6 py-4 rounded-2xl items-center ${selectedGoal ? 'bg-black' : 'bg-gray-300'}`}
          onPress={handleContinue}
        >
          <Text className="text-white font-semibold text-lg">Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

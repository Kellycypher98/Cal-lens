import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../store/onboardingStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function ActivityScreen() {
  const router = useRouter();
  const { setUserData } = useOnboardingStore();
  const [selectedActivity, setSelectedActivity] = useState('');

  const handleContinue = () => {
    if (selectedActivity) {
      setUserData({ activityLevel: selectedActivity });
      router.push('/(onboarding)/goal');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-1 justify-center bg-white px-6">
        <Text className="text-2xl font-bold mb-2">How active are you?</Text>
        <Text className="text-gray-500 mb-8">Select your weekly training frequency</Text>
        
        <Pressable 
          className={`mb-4 p-6 rounded-2xl active:bg-gray-200 ${selectedActivity === '1-2 times' ? 'bg-black' : 'bg-gray-100'}`}
          onPress={() => setSelectedActivity('1-2 times')}
        >
          <Text className={`text-lg font-semibold ${selectedActivity === '1-2 times' ? 'text-white' : 'text-black'}`}>Beginner</Text>
          <Text className={selectedActivity === '1-2 times' ? 'text-gray-300' : 'text-gray-500'}>I train 1-2 times per week</Text>
        </Pressable>

        <Pressable 
          className={`mb-4 p-6 rounded-2xl active:bg-gray-200 ${selectedActivity === '3-4 times' ? 'bg-black' : 'bg-gray-100'}`}
          onPress={() => setSelectedActivity('3-4 times')}
        >
          <Text className={`text-lg font-semibold ${selectedActivity === '3-4 times' ? 'text-white' : 'text-black'}`}>Intermediate</Text>
          <Text className={selectedActivity === '3-4 times' ? 'text-gray-300' : 'text-gray-500'}>I train 3-4 times per week</Text>
        </Pressable>

        <Pressable 
          className={`mb-8 p-6 rounded-2xl active:bg-gray-200 ${selectedActivity === '5+ times' ? 'bg-black' : 'bg-gray-100'}`}
          onPress={() => setSelectedActivity('5+ times')}
        >
          <Text className={`text-lg font-semibold ${selectedActivity === '5+ times' ? 'text-white' : 'text-black'}`}>Advanced</Text>
          <Text className={selectedActivity === '5+ times' ? 'text-gray-300' : 'text-gray-500'}>I train 5+ times per week</Text>
        </Pressable>

        <Pressable 
          className={`px-6 py-4 rounded-2xl items-center ${selectedActivity ? 'bg-black' : 'bg-gray-300'}`}
          onPress={handleContinue}
        >
          <Text className="text-white font-semibold text-lg">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

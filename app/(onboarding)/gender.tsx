import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import useOnboardingStore from '../../store/onboardingStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function GenderScreen() {
  const router = useRouter();
  const { setUserData } = useOnboardingStore();
  const [selectedGender, setSelectedGender] = useState('');

  const handleContinue = () => {
    if (selectedGender) {
      setUserData({ gender: selectedGender });
      router.push('/(onboarding)/heightandweight');
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex-1 justify-center bg-white px-6">
        <Text className="text-2xl font-bold mb-2">What's your gender?</Text>
        <Text className="text-gray-500 mb-8">Select your gender</Text>
        
        <Pressable 
          className={`mb-4 p-6 rounded-2xl active:bg-gray-200 ${selectedGender === 'male' ? 'bg-black' : 'bg-gray-100'}`}
          onPress={() => setSelectedGender('male')}
        >
          <Text className={`text-lg font-semibold ${selectedGender === 'male' ? 'text-white' : 'text-black'}`}>Male</Text>
        </Pressable>

        <Pressable 
          className={`mb-4 p-6 rounded-2xl active:bg-gray-200 ${selectedGender === 'female' ? 'bg-black' : 'bg-gray-100'}`}
          onPress={() => setSelectedGender('female')}
        >
          <Text className={`text-lg font-semibold ${selectedGender === 'female' ? 'text-white' : 'text-black'}`}>Female</Text>
        </Pressable>

        <Pressable 
          className={`mb-8 p-6 rounded-2xl active:bg-gray-200 ${selectedGender === 'other' ? 'bg-black' : 'bg-gray-100'}`}
          onPress={() => setSelectedGender('other')}
        >
          <Text className={`text-lg font-semibold ${selectedGender === 'other' ? 'text-white' : 'text-black'}`}>Other</Text>
        </Pressable>

        <Pressable 
          className={`px-6 py-4 rounded-2xl items-center ${selectedGender ? 'bg-black' : 'bg-gray-300'}`}
          onPress={handleContinue}
        >
          <Text className="text-white font-semibold text-lg">Next</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

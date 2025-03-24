import { View, Text, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import BmiPicker from '@/components/BmiPicker';
import useOnboardingStore from '@/store/onboardingStore'; // Make sure the path is correct

export default function HeightAndWeightScreen() {
    const router = useRouter();
    const { height, weight } = useOnboardingStore(); // Access the store values

    const handleNext = () => {
        // We can validate if height and weight are set before continuing
        if (height && weight) {
            router.push('/(onboarding)/activity');
        } else {
            // You might want to show an alert if values aren't set
            alert('Please set your height and weight before continuing');
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center bg-white px-6">
                <BmiPicker />
                <TouchableOpacity
                    className="bg-black px-6 py-4 rounded-2xl mt-8 items-center"
                    onPress={handleNext}
                >
                    <Text className="text-white font-semibold">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
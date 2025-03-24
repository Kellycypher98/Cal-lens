import { View, Text, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import BmiPicker from '@/components/BmiPicker';

export default function HeightAndWeightScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
    
        <View className="flex-1 justify-center bg-white px-6">
            <BmiPicker />
            <TouchableOpacity
                className="bg-black px-6 py-4 rounded-2xl mt-8 items-center"
                onPress={() => router.push('/(onboarding)/activity')}
            >
                <Text className="text-white font-semibold">Next</Text>
            </TouchableOpacity>
        </View>
                    
        </SafeAreaView>
    );
}


import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import BmiPicker from '@/components/BmiPicker';

export default function HeightAndWeightScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center bg-white px-6">
            <BmiPicker />
            <TouchableOpacity
                className="bg-blue-500 px-6 py-3 rounded-full mt-6"
                onPress={() => router.push('/(onboarding)/activity')}
            >
                <Text className="text-white font-semibold">Next</Text>
            </TouchableOpacity>
        </View>
    );
}

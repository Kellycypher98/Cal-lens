import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AgePicker from '@/components/AgePicker';

export default function DOBScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center bg-white px-6">
            <AgePicker />
            <Pressable 
                className="bg-blue-500 px-6 py-3 rounded-full mt-6"
                onPress={() => router.push('/(onboarding)/heightandweight')}
            >
                <Text className="text-white font-semibold">Next</Text>
            </Pressable>
        </View>
    );
}

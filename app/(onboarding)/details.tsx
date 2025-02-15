
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AgePicker from '@/components/AgePicker';
import BMIPicker from '@/components/BmiPicker';

export default function DetailsScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 justify-center bg-white px-6">
            <AgePicker />
            <BMIPicker />
            <Pressable className="bg-blue-500 px-6 py-3 rounded-full mt-6" onPress={() => router.push('/(onboarding)/activity')}>
                <Text className="text-white font-semibold">Next</Text>
            </Pressable>
        </View>
    );
}
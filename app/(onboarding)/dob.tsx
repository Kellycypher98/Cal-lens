import { View, Text,  TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AgePicker from '@/components/AgePicker';

export default function DOBScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 justify-center px-6">
                <Text className="text-2xl font-bold mb-8">When were you born?</Text>
                <View className=" rounded-2xl p-6 ">
                    <AgePicker />
                </View>
                <TouchableOpacity 
                    className="bg-black px-6 py-4 rounded-2xl mt-8 items-center"
                    onPress={() => router.push('/(onboarding)/gender')}
                >
                    <Text className="text-white font-semibold text-lg">Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

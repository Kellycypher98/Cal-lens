import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function PersonalizationScreen() {
  const navigation = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Dummy user data from onboarding
  const user = {
    name: "John Doe",
    age: "25",
    height: "180 cm",
    weight: "75 kg",
    country: "Germany",
  };

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold mb-6">Personalization</Text>

      {/* 🏷️ Personal Info */}
      <View className="bg-gray-100 p-4 rounded-2xl">
        <Text className="text-lg font-semibold mb-2">Personal Details</Text>
        <Text className="text-gray-600">Name: {user.name}</Text>
        <Text className="text-gray-600">Age: {user.age}</Text>
        <Text className="text-gray-600">Height: {user.height}</Text>
        <Text className="text-gray-600">Weight: {user.weight}</Text>
        <Text className="text-gray-600">Country: {user.country}</Text>

        <TouchableOpacity
          className="mt-3 bg-black rounded-lg py-3"
          onPress={() => navigation.push("/editProfile")}
        >
          <Text className="text-white text-center font-semibold">Edit Personal Details</Text>
        </TouchableOpacity>
      </View>

      {/* 🔔 Notifications */}
      <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-2xl mt-6">
        <Text className="text-lg font-semibold">Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      {/* 🌙 Dark Mode */}
      <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-2xl mt-4">
        <Text className="text-lg font-semibold">Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      {/* ⭐ Premium */}
      <TouchableOpacity className="bg-black p-4 rounded-2xl mt-6">
        <Text className="text-white text-lg font-bold text-center">Upgrade to Premium</Text>
        <Text className="text-white text-center mt-1">Get access to all features</Text>
        <Text className="text-white text-center mt-1">$9.99/month</Text>
      </TouchableOpacity>

      {/* 📄 Legal & Support */}
      <View className="mt-6">
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
          <Text className="text-gray-700 text-lg">Terms of Use</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        
        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
          <Text className="text-gray-700 text-lg">Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center py-3 border-b border-gray-200">
          <Text className="text-gray-700 text-lg">Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      {/* ❌ Delete Account */}
      <TouchableOpacity className="mt-8 mb-4">
        <Text className="text-red-500 text-center text-lg font-semibold">Delete Account</Text>
      </TouchableOpacity>

      {/* 🚪 Logout */}
      <TouchableOpacity className="mt-2 mb-8">
        <Text className="text-gray-700 text-center text-lg font-semibold">Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

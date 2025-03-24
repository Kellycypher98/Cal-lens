import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, ScrollView, SafeAreaView } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function PersonalizationScreen() {

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
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-6">
        <Text className="text-2xl font-bold mb-6">Personalization</Text>

        {/* 🏷️ Personal Info */}
        <View className="bg-white border border-gray-100 shadow-sm p-6 rounded-2xl">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold">Personal Details</Text>
            <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
              <Ionicons name="person" size={20} color="black" />
            </View>
          </View>

          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Name</Text>
              <Text className="text-gray-900 font-medium">{user.name}</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Age</Text>
              <Text className="text-gray-900 font-medium">{user.age}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Height</Text>
              <Text className="text-gray-900 font-medium">{user.height}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Weight</Text>
              <Text className="text-gray-900 font-medium">{user.weight}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-gray-500">Country</Text>
              <Text className="text-gray-900 font-medium">{user.country}</Text>
            </View>
          </View>

          <TouchableOpacity
            className="mt-6 bg-black rounded-xl py-4 flex-row justify-center items-center"
            onPress={() => navigation.push("/editProfile")}
          >
            <Ionicons name="create-outline" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Edit Personal Details</Text>
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
        <View className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <TouchableOpacity className="flex-row items-center p-4 space-x-3">
            <View className=" items-center justify-center">
              <Ionicons name="document-text-outline" size={18} color="black" />
            </View>
            <Text className="flex-1 text-gray-800 text-base font-medium">Terms of Use</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center p-4 space-x-3 border-t border-gray-100">
            <View className=" items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={18} color="black" />
            </View>
            <Text className="flex-1 text-gray-800 text-base font-medium">Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 space-x-3 border-t border-gray-100">
            <View className=" items-center justify-center">
              <Ionicons name="help-buoy-outline" size={18} color="black" />
            </View>
            <Text className="flex-1 text-gray-800 text-base font-medium">Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="gray" />
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
    </SafeAreaView>
  );
}

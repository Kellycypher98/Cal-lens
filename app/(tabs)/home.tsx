import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useNavigation } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Generate last 7 days for scrolling
  const getLast7Days = () => {
    return [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();
  };

  const dates = getLast7Days();

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const ProgressRing = ({ percent, color }) => {
    const size = 60;
    const strokeWidth = 6;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <View className="items-center justify-center">
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            stroke="#E5E7EB"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <Circle
            stroke={color}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 ">
        {/* 🗓️ Date Picker */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {dates.map((date, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-lg mx-2 ${
                  isSelected ? "bg-black" : "bg-gray-100"
                }`}
              >
                <Text className={`text-center ${isSelected ? "text-white" : "text-gray-600"} font-semibold`}>
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
                <Text className={`text-center ${isSelected ? "text-white" : "text-gray-600"} text-lg`}>
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 🔥 Calorie Goal */}
        <LinearGradient colors={["#FF9F00", "#FF4D00"]} className="p-6 rounded-xl shadow-lg">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white text-lg font-semibold">Daily Goal</Text>
              <Text className="text-white text-3xl font-bold mt-1">2,000</Text>
              <Text className="text-white opacity-80">calories</Text>
            </View>
            
            <View className="items-end">
              <Text className="text-white text-lg font-semibold">Remaining</Text>
              <Text className="text-white text-3xl font-bold mt-1">1,050</Text>
              <Text className="text-white opacity-80">calories</Text>
            </View>
          </View>
          
          {/* Progress bar */}
          <View className="mt-4 bg-white/20 h-2 rounded-full">
            <View className="bg-white w-[47.5%] h-full rounded-full" />
          </View>
          
          <View className="flex-row justify-between mt-2">
            <Text className="text-white opacity-80">950 eaten</Text>
            <Text className="text-white opacity-80">47.5%</Text>
          </View>
        </LinearGradient>

        {/* 🍗 Top 3 Macros */}
        <View className="flex-row justify-between mt-4">
          {[
            { label: "Protein", value: "150g", percent: 75, color: "#3B82F6" },
            { label: "Carbs", value: "220g", percent: 60, color: "#F59E0B" },
            { label: "Fat", value: "80g", percent: 40, color: "#EF4444" },
          ].map((macro, index) => (
            <View key={index} className="w-[30%] bg-gray-100 p-3 rounded-xl items-center">
              <Text className="text-gray-700 font-semibold mb-2">{macro.label}</Text>
              <ProgressRing percent={macro.percent} color={macro.color} />
              <Text className="text-lg font-bold mt-2">{macro.value}</Text>
              <Text className="text-sm text-gray-500">{macro.percent}%</Text>
            </View>
          ))}
        </View>

        {/* 📝 Recent Logs */}
        <Text className="text-lg font-semibold mt-6">Recent Logs</Text>
        {[
          { food: "Grilled Chicken", calories: 300 },
          { food: "Oatmeal", calories: 200 },
          { food: "Salmon & Rice", calories: 450 },
        ].map((log, index) => (
          <View key={index} className="bg-gray-100 p-4 rounded-xl flex-row justify-between items-center mt-3">
            <Text className="text-gray-800 font-semibold">{log.food}</Text>
            <Text className="text-gray-600">{log.calories} kcal</Text>
          </View>
        ))}
        
        {/* Add padding at bottom for floating button */}
        <View className="h-20" />
      </ScrollView>

      {/* ➕ Add Food Button - Floating */}
      <View className="absolute bottom-8 left-0 right-0 px-4">
        {isExpanded && (
          <View className="flex flex-row justify-between">
            <TouchableOpacity
              onPress={() => router.push("/(logfood)/fooddbsearch")}
              className="bg-blue-500 rounded-lg py-4 flex-col items-center justify-center shadow-lg flex-1 mx-2"
            >
              <Ionicons name="search" size={24} color="white" />
              <Text className="text-white text-md font-semibold">From Database</Text>
            </TouchableOpacity>

           
            <TouchableOpacity
              onPress={() => router.push("/(logfood)/foodscanscreen")}
              className="bg-purple-500 rounded-lg py-4 flex-col items-center justify-center shadow-lg flex-1 mx-2"
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text className="text-white text-md  font-semibold">Scan Food or barcode</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/(logfood)/productscreen")}
              className="bg-purple-500 rounded-lg py-4 flex-col items-center justify-center shadow-lg flex-1 mx-2"
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text className="text-white text-md  font-semibold">temporal button</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Main action button */}
        <TouchableOpacity
          onPress={toggleExpand}
          className={`bg-black rounded-full py-4 flex-row items-center justify-center shadow-lg mt-4 ${
            isExpanded ? "opacity-50" : ""
          }`}
        >
          <Ionicons name={isExpanded ? "close" : "add-circle"} size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">Log Food</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

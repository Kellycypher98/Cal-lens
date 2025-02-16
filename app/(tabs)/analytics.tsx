import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";

export default function AnalyticsScreen() {
  const screenWidth = Dimensions.get("window").width;

  // Mock Data
  const weightData = {
    labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20"],
    datasets: [{
      data: [75, 74.5, 74, 73.5, 73]
    }]
  };

  const calorieData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [1800, 2000, 1900, 2100, 1950, 2200, 2050]
    }]
  };

  const chartConfig = {
    backgroundGradientFrom: "#f3f4f6",
    backgroundGradientTo: "#f3f4f6",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-6">
      {/* 📈 Weight Progress */}
      <Text className="text-lg font-semibold mb-2">Weight Progress</Text>
      <View className="bg-gray-100 p-4 rounded-xl shadow-md">
        <LineChart
          data={weightData}
          width={screenWidth - 50}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(255, 77, 0, ${opacity})`,
          }}
          bezier
          style={{
            borderRadius: 16
          }}
        />
      </View>

      {/* 🔥 Calorie Intake Statistics */}
      <Text className="text-lg font-semibold mt-6 mb-2">Calorie Intake</Text>
      <View className="bg-gray-100 p-4 rounded-xl shadow-md">
        <BarChart
          data={calorieData}
          width={screenWidth - 50}
          height={220}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(255, 159, 0, ${opacity})`,
          }}
          style={{
            borderRadius: 16
          }}
        />
      </View>
    </ScrollView>
  );
}

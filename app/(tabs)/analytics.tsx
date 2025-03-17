import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  SafeAreaView 
} from "react-native";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

export default function AnalyticsScreen() {
  const screenWidth = Dimensions.get("window").width;
  const [activeTimeFrame, setActiveTimeFrame] = useState("week");
  
  // Mock Data
  const weightData = {
    labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Jan 25", "Jan 30"],
    datasets: [{
      data: [75, 74.5, 74, 73.5, 73, 72.8, 72.5],
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // blue shade
      strokeWidth: 2
    }]
  };
  
  const calorieData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [1800, 2000, 1900, 2100, 1950, 2200, 2050]
    }]
  };
  
  const macroData = [
    {
      name: "Protein",
      value: 30,
      color: "#4169E1",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Carbs",
      value: 45,
      color: "#50C878",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    },
    {
      name: "Fat",
      value: 25,
      color: "#FF6347",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12
    }
  ];
  
  const activityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [{
      data: [30, 45, 20, 60, 35, 90, 40] // minutes of exercise
    }]
  };
  
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.6,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 10,
    },
  };
  
  const TimeFrameSelector = () => (
    <View className="flex-row justify-center my-4 bg-gray-100 rounded-full p-1">
      {["week", "month", "3month", "year"].map((timeFrame) => (
        <TouchableOpacity
          key={timeFrame}
          className={`px-4 py-2 rounded-full ${
            activeTimeFrame === timeFrame ? "bg-blue-500" : "bg-transparent"
          }`}
          onPress={() => setActiveTimeFrame(timeFrame)}
        >
          <Text 
            className={`font-medium ${
              activeTimeFrame === timeFrame ? "text-white" : "text-gray-600"
            }`}
          >
            {timeFrame === "week" ? "Week" : 
             timeFrame === "month" ? "Month" : 
             timeFrame === "3month" ? "3 Months" : "Year"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  
  const StatCard = ({ title, value, unit, icon, color, change, positive }) => (
    <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex-1 mx-1">
      <View className="flex-row justify-between items-center mb-2">
        <View className={`w-10 h-10 rounded-full items-center justify-center`} style={{ backgroundColor: `${color}20` }}>
          {icon}
        </View>
        {change && (
          <View className={`flex-row items-center px-2 py-1 rounded-full ${positive ? 'bg-green-100' : 'bg-red-100'}`}>
            <Ionicons name={positive ? "trending-up" : "trending-down"} size={12} color={positive ? "#10b981" : "#ef4444"} />
            <Text className={`text-xs ml-1 ${positive ? 'text-green-600' : 'text-red-600'}`}>{change}%</Text>
          </View>
        )}
      </View>
      <Text className="text-gray-500 text-sm">{title}</Text>
      <View className="flex-row items-baseline">
        <Text className="text-2xl font-bold">{value}</Text>
        <Text className="text-gray-500 text-sm ml-1">{unit}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-2xl font-bold mb-4">Your Progress</Text>
        
        {/* Time Frame Selector */}
        <TimeFrameSelector />
        
        {/* Stats Overview */}
        <View className="flex-row justify-between mb-6">
          <StatCard 
            title="Daily Average" 
            value="1,950" 
            unit="cal" 
            icon={<MaterialCommunityIcons name="fire" size={18} color="#f97316" />}
            color="#f97316" 
            change="3.2" 
            positive={true}
          />
          <StatCard 
            title="Current Weight" 
            value="72.5" 
            unit="kg" 
            icon={<MaterialCommunityIcons name="scale-bathroom" size={18} color="#3b82f6" />}
            color="#3b82f6" 
            change="2.5" 
            positive={true}
          />
        </View>
        
        {/* 📈 Weight Progress */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Weight Progress</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-sm">Details</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <LineChart
              data={weightData}
              width={screenWidth - 50}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              }}
              bezier
              style={{
                borderRadius: 16
              }}
              withDots={true}
              withShadow={false}
              withInnerLines={false}
              withOuterLines={true}
              fromZero={false}
              yAxisSuffix=" kg"
            />
          </View>
        </View>
        
        {/* 🔥 Calorie Intake Statistics */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Calorie Intake</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-sm">Details</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <BarChart
              data={calorieData}
              width={screenWidth - 50}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`,
                fillShadowGradientOpacity: 1,
                fillShadowGradient: "#f97316",
              }}
              style={{
                borderRadius: 16
              }}
              withInnerLines={false}
              showBarTops={false}
              fromZero={true}
              yAxisSuffix=" cal"
            />
            <View className="flex-row justify-around mt-4 px-4">
              <View className="items-center">
                <Text className="text-xs text-gray-500">Daily Goal</Text>
                <Text className="text-base font-bold">2,000 cal</Text>
              </View>
              <View className="items-center">
                <Text className="text-xs text-gray-500">Daily Average</Text>
                <Text className="text-base font-bold">1,950 cal</Text>
              </View>
              <View className="items-center">
                <Text className="text-xs text-gray-500">Weekly Total</Text>
                <Text className="text-base font-bold">13,650 cal</Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* Macronutrients */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Macronutrient Distribution</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-sm">Details</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <PieChart
              data={macroData}
              width={screenWidth - 50}
              height={200}
              chartConfig={chartConfig}
              accessor="value"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>
        </View>
        
        {/* Activity Tracking */}
        <View className="mb-12">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-semibold">Exercise Activity</Text>
            <TouchableOpacity>
              <Text className="text-blue-500 text-sm">Details</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <BarChart
              data={activityData}
              width={screenWidth - 50}
              height={220}
              chartConfig={{
                ...chartConfig,
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                fillShadowGradientOpacity: 1,
                fillShadowGradient: "#10b981",
              }}
              style={{
                borderRadius: 16
              }}
              withInnerLines={false}
              showBarTops={false}
              fromZero={true}
              yAxisSuffix=" min"
            />
            <View className="flex-row justify-around mt-4 px-4">
              <View className="items-center">
                <Text className="text-xs text-gray-500">Weekly Total</Text>
                <Text className="text-base font-bold">320 min</Text>
              </View>
              <View className="items-center">
                <Text className="text-xs text-gray-500">Daily Average</Text>
                <Text className="text-base font-bold">45 min</Text>
              </View>
              <View className="items-center">
                <Text className="text-xs text-gray-500">Goal Progress</Text>
                <Text className="text-base font-bold">85%</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
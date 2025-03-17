import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  Image
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Defs, LinearGradient as SvgGradient, Stop } from "react-native-svg";
import { BlurView } from "expo-blur";

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isExpanded, setIsExpanded] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));
  const [waterAmount, setWaterAmount] = useState(4); // in cups

  const screenWidth = Dimensions.get('window').width;

  // Generate last 7 days for scrolling
  const getLast7Days = () => {
    return [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date;
    }).reverse();
  };

  const dates = getLast7Days();

  // Toggle expanded state with animation
  const toggleExpand = () => {
    const newValue = !isExpanded;
    setIsExpanded(newValue);
    
    Animated.spring(animatedValue, {
      toValue: newValue ? 1 : 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  };

  // Animation for floating menu
  const buttonTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10]
  });
  
  const menuOpacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 1]
  });
  
  const menuTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0]
  });

  // Meal data
  const meals = [
    {
      name: "Breakfast",
      time: "8:30 AM",
      calories: 320,
      foods: ["Avocado Toast", "Scrambled Eggs"],
      icon: "sunny-outline"
    },
    {
      name: "Lunch",
      time: "12:45 PM",
      calories: 430,
      foods: ["Grilled Chicken Salad", "Quinoa"],
      icon: "restaurant-outline"
    },
    {
      name: "Snack",
      time: "3:30 PM",
      calories: 200,
      foods: ["Greek Yogurt", "Mixed Berries"],
      icon: "cafe-outline"
    },
    {
      name: "Dinner",
      time: "Not logged yet",
      calories: 0,
      foods: [],
      icon: "moon-outline"
    }
  ];

  const ProgressRing = ({ percent, size = 60, strokeWidth = 6, color, gradientId }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <View className="items-center justify-center">
        <Svg width={size} height={size}>
          <Defs>
            {gradientId && (
              <SvgGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={color[0]} />
                <Stop offset="100%" stopColor={color[1]} />
              </SvgGradient>
            )}
          </Defs>
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
            stroke={gradientId ? `url(#${gradientId})` : color}
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

  const WaterTracker = () => {
    return (
      <View className="bg-gray-500 p-4 rounded-xl mt-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <MaterialCommunityIcons name="water" size={22} color="#ffffff" />
            <Text className="text-white font-semibold ml-2">Water Intake</Text>
          </View>
          <Text className="text-white font-bold">{waterAmount}/8 cups</Text>
        </View>
        
        <View className="flex-row justify-between mt-3">
          {[...Array(8)].map((_, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => setWaterAmount(index + 1)}
              className="items-center"
            >
              <MaterialCommunityIcons 
                name="cup" 
                size={24} 
                color={index < waterAmount ? "#000000" : "#CBD5E1"} 
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const MealCard = ({ meal, index, last }) => {
    return (
      <TouchableOpacity 
        className={`flex-row items-center p-4 ${
          !last ? "border-b border-gray-100" : ""
        }`}
        onPress={() => meal.foods.length > 0 && router.push("/(logfood)/mealdetail")}
      >
        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
          <Ionicons name={meal.icon} size={20} color="gray" />
        </View>
        
        <View className="flex-1">
          <View className="flex-row justify-between">
            <Text className="font-medium text-gray-800">{meal.name}</Text>
            <Text className="text-gray-500 text-sm">{meal.time}</Text>
          </View>
          
          {meal.foods.length > 0 ? (
            <Text className="text-gray-500 text-sm mt-1" numberOfLines={1}>
              {meal.foods.join(", ")}
            </Text>
          ) : (
            <Text className="text-blue-500 text-sm mt-1">+ Add food</Text>
          )}
        </View>
        
        <View className="ml-2 items-end">
          {meal.calories > 0 ? (
            <Text className="font-semibold">{meal.calories} kcal</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center px-4 pt-2 pb-4">
        <View>
          <Text className="text-gray-500">Sunday, March 16</Text>
          <Text className="text-2xl font-bold">Today</Text>
        </View>
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          onPress={() => router.push("/profile")}
        >
          <Ionicons name="person-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* 🗓️ Date Picker */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          className="mb-6 -mx-1"
          contentContainerStyle={{ paddingHorizontal: 1 }}
        >
          {dates.map((date, index) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDate(date)}
                className={`px-3 py-3 mx-2 rounded-xl ${
                  isSelected 
                    ? "bg-black" 
                    : isToday 
                      ? "bg-gray-100 border border-gray-200" 
                      : "bg-gray-50"
                }`}
                style={{ 
                  shadowColor: isSelected ? "#000" : "transparent",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: isSelected ? 0.15 : 0,
                  shadowRadius: 5,
                  elevation: isSelected ? 3 : 0
                }}
              >
                <Text className={`text-center ${
                  isSelected ? "text-white" : isToday ? "text-gray-800" : "text-gray-600"
                } font-medium text-xs`}>
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </Text>
                <Text className={`text-center ${
                  isSelected ? "text-white" : isToday ? "text-gray-800" : "text-gray-600"
                } text-lg font-bold mt-1`}>
                  {date.getDate()}
                </Text>
                {isToday && !isSelected && (
                  <View className="h-1 w-1 bg-blue-500 rounded-full self-center mt-1" />
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 🔥 Calorie Goal Card */}
        <View className="overflow-hidden rounded-xl shadow-md mb-4 ">
          <LinearGradient 
            colors={["#000000", "#808080"]} 
            start={[0, 0]} 
            end={[1, 1]} 
            className="p-6 rounded-xl"
          >
            <View className="flex-row justify-between items-center p-4">
              <View>
                <Text className="text-white font-medium opacity-80">Daily Goal</Text>
                <Text className="text-white text-3xl font-bold mt-1">2,000</Text>
                <Text className="text-white opacity-70">calories</Text>
              </View>
              
              <View className="items-end">
                <ProgressRing 
                  percent={48.5} 
                  size={80} 
                  strokeWidth={8} 
                  gradientId="calorieProgress"
                  color={[ "#FFD700","#32CD32"]} 
                />
                <View className="absolute inset-0 items-center justify-center">
                  <Text className="text-white font-bold text-xl">48%</Text>
                </View>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center mt-4 p-4">
              <View className="flex-1">
                <View className="flex-row items-center">
                  <FontAwesome5 name="utensils" size={12} color="white" style={{ opacity: 0.8 }} />
                  <Text className="text-white ml-2 opacity-80">Consumed</Text>
                </View>
                <Text className="text-white text-xl font-semibold mt-1">950</Text>
              </View>
              
              <View className="flex-1 items-center">
                <View className="w-[1px] h-10 bg-white opacity-20" />
              </View>
              
              <View className="flex-1 items-end">
                <View className="flex-row items-center">
                  <FontAwesome5 name="fire-alt" size={12} color="white" style={{ opacity: 0.8 }} />
                  <Text className="text-white ml-2 opacity-80">Remaining</Text>
                </View>
                <Text className="text-white text-xl font-semibold mt-1">1,050</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 🍗 Macro Distribution */}
        <View className="bg-white rounded-xl border border-gray-100 shadow-sm mb-4">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-gray-800 font-semibold">Macronutrient Balance</Text>
          </View>
          
          <View className="flex-row justify-between p-4">
            {[
              { label: "Protein", value: "48g", percent: 75, colors: ["#000000"], id: "proteinGradient" },
              { label: "Carbs", value: "132g", percent: 60, colors: ["#000000"], id: "carbsGradient" },
              { label: "Fat", value: "32g", percent: 40, colors: ["#000000"], id: "fatGradient" },
            ].map((macro, index) => (
              <View key={index} className="items-center">
                <ProgressRing 
                  percent={macro.percent} 
                  gradientId={macro.id}
                  color={macro.colors} 
                />
                <View className="absolute top-6 items-center justify-center">
                  <Text className="text-sm font-bold text-gray-700">{macro.percent}%</Text>
                </View>
                <Text className="text-gray-700 font-medium mt-3">{macro.label}</Text>
                <Text className="text-gray-500 text-sm">{macro.value}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* 💧 Water Tracker */}
        <WaterTracker />
        
        {/* 🍽️ Meals Section */}
        <View className="bg-white rounded-xl border border-gray-100 shadow-sm mt-4 mb-6">
          <View className="p-4 border-b border-gray-100">
            <Text className="text-gray-800 font-semibold">Today's Meals</Text>
          </View>
          
          {meals.map((meal, index) => (
            <MealCard 
              key={index} 
              meal={meal} 
              index={index} 
              last={index === meals.length - 1} 
            />
          ))}
          
          
        </View>
        
        {/* 🏃‍♂️ Activity Summary */}
        <View className="bg-white rounded-xl border border-gray-100 shadow-sm mb-10">
          <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-gray-800 font-semibold">Activity</Text>
            <TouchableOpacity>
              <Text className="text-indigo-600 text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          
          <View className="p-4 flex-row items-center">
            <View className="h-12 w-12 bg-green-100 rounded-full items-center justify-center mr-4">
              <MaterialCommunityIcons name="walk" size={24} color="#000000" />
            </View>
            
            <View className="flex-1">
              <Text className="text-gray-800 font-medium">Daily Step Count</Text>
              <View className="flex-row items-baseline">
                <Text className="text-2xl font-bold">7,842</Text>
                <Text className="text-gray-500 text-sm ml-1">/ 10,000 steps</Text>
              </View>
              
              <View className="h-2 bg-gray-100 rounded-full w-full mt-2">
                <View className="h-full bg-black rounded-full" style={{ width: '78%' }} />
              </View>
            </View>
          </View>
          
          {/* Optional Quick Exercise Log */}
       
        </View>
        
        {/* Padding for bottom buttons */}
        <View className="h-32" />
      </ScrollView>

      {/* ➕ Add Food Button - Floating */}
      <View className="absolute bottom-8 left-0 right-0 px-4 ">
        {/* Floating menu options */}
        <Animated.View 
          style={{
            opacity: menuOpacity,
            marginBottom: 10,
            transform: [{ translateY: menuTranslateY }],
            display: isExpanded ? 'flex' : 'none'
          }}
        >
          <BlurView intensity={50} tint="dark" className="rounded-xl overflow-hidden mb-3">
            <View className="bg-white/70 backdrop-blur-lg">
              {[
                {
                  title: "Search Database",
                  icon: "search",
                  color: "#4F46E5",
                  route: "/(logfood)/fooddbsearch"
                },
                {
                  title: "Scan Food or Barcode",
                  icon: "camera",
                  color: "#8B5CF6",
                  route: "/(logfood)/foodscanscreen"
                },
                {
                  title: "Quick Add Calories", 
                  icon: "flash",
                  color: "#F59E0B",
                  route: "/(logfood)/quickadd"
                }
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    toggleExpand();
                    router.push(item.route);
                  }}
                  className={`flex-row items-center p-4 ${
                    index !== 2 ? "border-b border-gray-200/30" : ""
                  }`}
                >
                  <View 
                    className="h-10 w-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <Text className="text-gray-800 font-medium">{item.title}</Text>
                  <View className="flex-1" />
                  <Ionicons name="chevron-forward" size={20} color="gray" />
                </TouchableOpacity>
              ))}
            </View>
          </BlurView>
        </Animated.View>

        {/* Main action button */}
        <Animated.View
          style={{
            transform: [{ translateY: buttonTranslateY }]
          }}
        >
          <TouchableOpacity
            onPress={toggleExpand}
            className="bg-black rounded-full py-4 flex-row items-center justify-center shadow-lg"
            style={{ 
              shadowColor: '#4F46E5',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5
            }}
          >
            <Ionicons name={isExpanded ? "close" : "add"} size={24} color="white" />
            <Text className="text-white text-lg font-semibold ml-2">Log Food</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
import { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  ActivityIndicator, 
  Image, 
  TouchableOpacity, 
  Alert, 
  SafeAreaView,
  ScrollView,
  Animated
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from 'expo-blur';


export default function ProductScreen() {
  const { foodName, scanMethod } = useLocalSearchParams();
  const router = useRouter();
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animateValue] = useState(new Animated.Value(0));
  
  useEffect(() => {
    // Animation effect when content loads
    if (!loading && nutrition) {
      Animated.timing(animateValue, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [loading, nutrition]);

  useEffect(() => {
    // Simulate API loading with a timeout
    const timer = setTimeout(() => {
      // Create dummy nutrition data based on foodName
      const dummyData = createDummyNutritionData(foodName || "Unknown Food");
      setNutrition(dummyData);
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [foodName]);

  // Function to create dummy nutrition data
  const createDummyNutritionData = (name) => {
    // Create different dummy data based on food name
    const dummyFoods = {
      "Apple": {
        label: "Apple",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6",
        description: "A crisp and sweet fruit, packed with fiber and vitamin C. Perfect as a portable snack.",
        nutrients: {
          ENERC_KCAL: 52,
          PROCNT: 0.3,
          CHOCDF: 14,
          FAT: 0.2,
          FIBTG: 2.4,
          SUGAR: 10.3
        },
        servingSize: "1 medium apple (182g)"
      },
      "Banana": {
        label: "Banana",
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224",
        description: "A potassium-rich fruit with natural sweetness. Great for energy before or after workouts.",
        nutrients: {
          ENERC_KCAL: 89,
          PROCNT: 1.1,
          CHOCDF: 22.8,
          FAT: 0.3,
          FIBTG: 2.6,
          SUGAR: 12.2
        },
        servingSize: "1 medium banana (118g)"
      },
      "Scanned Product": {
        label: "Granola Bar",
        image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e",
        description: "A convenient energy snack with oats, honey, and mixed nuts.",
        nutrients: {
          ENERC_KCAL: 150,
          PROCNT: 3.5,
          CHOCDF: 25,
          FAT: 4.2,
          FIBTG: 1.8,
          SUGAR: 9.5
        },
        servingSize: "1 bar (40g)"
      }
    };

    // Return matching dummy food or generic data
    return dummyFoods[name] || {
      label: name,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      description: "A nutritious food option to add to your meal plan.",
      nutrients: {
        ENERC_KCAL: 100,
        PROCNT: 2.0,
        CHOCDF: 15.0,
        FAT: 2.0,
        FIBTG: 1.5,
        SUGAR: 5.0
      },
      servingSize: "1 serving"
    };
  };

  const handleLogFood = () => {
    Alert.alert(
      "Food Logged", 
      `${nutrition.label} added to your log!`,
      [{ 
        text: "View Food Journal", 
        onPress: () => router.replace("/mealjournal")
      }, {
        text: "Done",
        style: "cancel",
        onPress: () => router.back()
      }]
    );
  };

  // Calculate nutrition bar widths
  const calculateBarWidth = (nutrient) => {
    const maxValues = {
      PROCNT: 30, // protein max value for bar scale
      CHOCDF: 50, // carbs max value for bar scale
      FAT: 40,    // fat max value for bar scale
    };
    
    const nutrientValue = nutrition.nutrients[nutrient];
    const maxVal = maxValues[nutrient];
    return `${Math.min(100, (nutrientValue / maxVal) * 100)}%`;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="mt-4 text-gray-600 font-medium">Analyzing nutrition data...</Text>
        </View>
      ) : nutrition ? (
        <ScrollView className="flex-1">
          {/* Header Image with Gradient Overlay */}
          <View className="w-full h-64 relative">
            <Image 
              source={{ uri: nutrition.image }} 
              className="w-full h-full"
              resizeMode="cover"
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
              className="absolute bottom-0 left-0 right-0 h-32"
            />
            <TouchableOpacity 
              className="absolute top-4 left-4 bg-white/20 rounded-full p-2 backdrop-blur-md"
              style={{ backdropFilter: 'blur(10px)' }}
              onPress={() => router.back()}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View className="absolute bottom-4 left-4 right-4">
              <Text className="text-white text-3xl font-bold">{nutrition.label}</Text>
              <View className="flex-row items-center mt-1">
                <MaterialCommunityIcons 
                  name={scanMethod === "barcode" ? "barcode-scan" : "food"} 
                  size={16} 
                  color="white" 
                />
                <Text className="text-white ml-1 opacity-90">
                  {scanMethod === "barcode" ? "Barcode Scan" : "Food Recognition"}
                </Text>
              </View>
            </View>
          </View>

          {/* Main Content */}
          <View className="px-4 py-6">
            <Animated.View 
              className="mb-6"
              style={{ 
                opacity: animateValue,
                transform: [{ translateY: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })}] 
              }}
            >
              <Text className="text-gray-700 text-base leading-6">{nutrition.description}</Text>
              <Text className="text-gray-500 mt-2 text-sm">{nutrition.servingSize}</Text>
            </Animated.View>

            {/* Calories Card */}
            <Animated.View 
              className="bg-blue-50 p-5 rounded-2xl mb-6 shadow-sm"
              style={{ 
                opacity: animateValue,
                transform: [{ translateY: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                })}] 
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <FontAwesome6 name="fire" size={20} color="#3b82f6" />
                  <Text className="text-gray-800 text-lg font-bold ml-2">Calories</Text>
                </View>
                <Text className="text-3xl font-bold text-blue-500">{nutrition.nutrients.ENERC_KCAL}</Text>
              </View>
              <Text className="text-right text-gray-500">kcal per serving</Text>
            </Animated.View>

            {/* Macronutrients Card */}
            <Animated.View 
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6"
              style={{ 
                opacity: animateValue,
                transform: [{ translateY: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                })}] 
              }}
            >
              <Text className="text-gray-800 text-lg font-bold mb-4">Macronutrients</Text>
              
              {/* Protein */}
              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="food-drumstick" size={18} color="#f59e0b" />
                    <Text className="text-gray-700 ml-2">Protein</Text>
                  </View>
                  <Text className="text-gray-700 font-medium">{nutrition.nutrients.PROCNT}g</Text>
                </View>
                <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-yellow-500 rounded-full"
                    style={{ width: calculateBarWidth('PROCNT') }}
                  />
                </View>
              </View>
              
              {/* Carbs */}
              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-row items-center">
                    <MaterialIcons name="grain" size={18} color="#10b981" />
                    <Text className="text-gray-700 ml-2">Carbs</Text>
                  </View>
                  <Text className="text-gray-700 font-medium">{nutrition.nutrients.CHOCDF}g</Text>
                </View>
                <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: calculateBarWidth('CHOCDF') }}
                  />
                </View>
                <View className="flex-row justify-between mt-1">
                  <Text className="text-xs text-gray-500">Sugar: {nutrition.nutrients.SUGAR}g</Text>
                  <Text className="text-xs text-gray-500">Fiber: {nutrition.nutrients.FIBTG}g</Text>
                </View>
              </View>
              
              {/* Fat */}
              <View>
                <View className="flex-row justify-between items-center mb-1">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="oil" size={18} color="#ef4444" />
                    <Text className="text-gray-700 ml-2">Fat</Text>
                  </View>
                  <Text className="text-gray-700 font-medium">{nutrition.nutrients.FAT}g</Text>
                </View>
                <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <View 
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: calculateBarWidth('FAT') }}
                  />
                </View>
              </View>
            </Animated.View>
            
            {/* Log Food Button */}
            <Animated.View
              style={{ 
                opacity: animateValue,
                transform: [{ scale: animateValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                })}] 
              }}
            >
              <TouchableOpacity
                className="bg-blue-500 p-4 rounded-xl w-full flex-row justify-center items-center mt-4"
                activeOpacity={0.8}
                onPress={handleLogFood}
              >
                <MaterialIcons name="add-circle-outline" size={24} color="white" />
                <Text className="text-white text-lg font-bold ml-2">Add to Food Journal</Text>
              </TouchableOpacity>
            </Animated.View>
            
            <View className="h-20" /> {/* Bottom padding */}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center p-6">
          <MaterialIcons name="error-outline" size={64} color="#cbd5e1" />
          <Text className="text-center text-xl font-medium text-gray-700 mt-4">No Data Available</Text>
          <Text className="text-center text-gray-500 mt-2">We couldn't find nutrition information for this item.</Text>
          <TouchableOpacity
            className="mt-6 bg-blue-500 py-3 px-6 rounded-lg"
            onPress={() => router.back()}
          >
            <Text className="text-white font-medium">Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
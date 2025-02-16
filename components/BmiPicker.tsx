import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, SafeAreaView } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useNavigation } from "expo-router";

export default function BMIPicker() {
  const navigation = useNavigation();
  const [isMetric, setIsMetric] = useState(false);
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("6");
  const [weight, setWeight] = useState("120");

  // Data Arrays
  const feet = Array.from({ length: 8 }, (_, i) => (i + 1).toString()); // 1ft to 8ft
  const inches = Array.from({ length: 12 }, (_, i) => i.toString()); // 0in to 11in
  const cm = Array.from({ length: 121 }, (_, i) => (i + 100).toString()); // 100cm to 220cm
  const lbs = Array.from({ length: 171 }, (_, i) => (i + 30).toString()); // 30lb to 200lb
  const kg = Array.from({ length: 171 }, (_, i) => (i + 30).toString()); // 30kg to 200kg

  return (
    <SafeAreaView className=" flex-1 bg-white p-6">
      {/* Title */}
      <Text className="text-2xl font-bold mt-4">Height & Weight</Text>
      <Text className="text-gray-500 mb-8">This will be used to calibrate your custom plan.</Text>

      {/* Toggle Switch */}
      <View className="flex-row items-center justify-between bg-gray-100 rounded-full p-3">
        <View className="flex-1 items-center">
          <Text className={`${!isMetric ? "font-bold" : "text-black"}`}>Imperial</Text>
        </View>
        <View className="flex-1 items-center">
          <Switch
            value={isMetric}
            onValueChange={setIsMetric}
            trackColor={{ false: "#d1d5db", true: "#000" }}
            thumbColor={"#fff"}
            ios_backgroundColor="#767577"
          />
        </View>
        <View className="flex-1 items-center">
          <Text className={`${isMetric ? "font-bold" : "text-gray-500"}`}>Metric</Text>
        </View>
      </View>

      {/* Pickers - Side by Side Layout */}
      <View className="flex-row  items-center mt-6 bg-gray-100 rounded-2xl p-4">
        {/* Height Picker */}
        <View className="flex-row space-x-2">
          {!isMetric ? (
            <>
              {/* Feet Picker */}
              <View className="bg-white rounded-xl shadow-sm px-2">
                <WheelPickerExpo
                  height={150}
                  width={80}
                  items={feet.map((item) => ({ label: `${item} ft`, value: item }))}
                  selected={heightFt}
                  onChange={(val) => setHeightFt(val)}
                  backgroundColor="transparent"
                />
              </View>
              {/* Inches Picker */}
              <View className="bg-white rounded-xl shadow-sm px-2">
                <WheelPickerExpo
                  height={150}
                  width={80}
                  items={inches.map((item) => ({ label: `${item} in`, value: item }))}
                  selected={heightIn}
                  onChange={(val) => setHeightIn(val)}
                  backgroundColor="transparent"
                />
              </View>
            </>
          ) : (
            <View className="bg-white rounded-xl shadow-sm px-4">
              <WheelPickerExpo
                height={150}
                width={100}
                items={cm.map((item) => ({ label: `${item} cm`, value: item }))}
                selected={heightFt}
                onChange={(val) => setHeightFt(val)}
                backgroundColor="transparent"
              />
            </View>
          )}
        </View>

        {/* Weight Picker */}
        <View className="bg-white rounded-xl shadow-sm px-4">
          <WheelPickerExpo
            height={150}
            width={100}
            items={(isMetric ? kg : lbs).map((item) => ({ label: `${item} ${isMetric ? "kg" : "lb"}`, value: item }))}
            selected={weight}
            onChange={(val) => setWeight(val)}
            backgroundColor="transparent"
          />
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        className="bg-black rounded-full py-4 mt-8 shadow-lg" 
        onPress={() => navigation.push("/nextScreen")}
      >
        <Text className="text-white text-center text-lg font-semibold">Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

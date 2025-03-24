import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Switch, SafeAreaView } from "react-native";
import WheelPickerExpo from "react-native-wheel-picker-expo";
import { useNavigation } from "expo-router";
import useOnboardingStore from "../store/onboardingStore";

export default function BMIPicker() {
  const navigation = useNavigation();
  const { setUserData } = useOnboardingStore();
  
  const [isMetric, setIsMetric] = useState(false);
  
  // Separate states for imperial and metric
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("6");
  const [heightCm, setHeightCm] = useState("170"); // More reasonable default
  
  const [weightLbs, setWeightLbs] = useState("150");
  const [weightKg, setWeightKg] = useState("68");  // More reasonable default

  // Data Arrays
  const feet = Array.from({ length: 8 }, (_, i) => (i + 1).toString());
  const inches = Array.from({ length: 12 }, (_, i) => i.toString());
  const cm = Array.from({ length: 121 }, (_, i) => (i + 100).toString());
  const lbs = Array.from({ length: 171 }, (_, i) => (i + 30).toString());
  const kg = Array.from({ length: 111 }, (_, i) => (i + 30).toString()); // 30-140kg

  // Convert units when toggle changes
  useEffect(() => {
    if (isMetric) {
      // Convert from imperial to metric
      const cmValue = Math.round(parseInt(heightFt) * 30.48 + parseInt(heightIn) * 2.54);
      setHeightCm(cmValue.toString());
      
      const kgValue = Math.round(parseInt(weightLbs) * 0.453592);
      setWeightKg(kgValue.toString());
    } else {
      // Convert from metric to imperial
      const totalInches = Math.round(parseInt(heightCm) / 2.54);
      const ftValue = Math.floor(totalInches / 12);
      const inValue = totalInches % 12;
      
      setHeightFt(ftValue.toString());
      setHeightIn(inValue.toString());
      
      const lbsValue = Math.round(parseInt(weightKg) / 0.453592);
      setWeightLbs(lbsValue.toString());
    }
  }, [isMetric]);

  // Update the store whenever values change
  useEffect(() => {
    const heightInCm = isMetric 
      ? heightCm 
      : (parseInt(heightFt) * 30.48 + parseInt(heightIn) * 2.54).toFixed(0);
      
    const weightInKg = isMetric 
      ? weightKg 
      : (parseInt(weightLbs) * 0.453592).toFixed(0);
      
    setUserData({
      height: heightInCm,
      weight: weightInKg
    });
  }, [heightFt, heightIn, heightCm, weightLbs, weightKg, isMetric]);

  // Toggle between metric and imperial
  const toggleUnitSystem = (value) => {
    setIsMetric(value);
  };

  return (
    <View>
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
            onValueChange={toggleUnitSystem}
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
      <View className="flex-row items-center mt-6 rounded-2xl p-4">
        {/* Height Picker */}
        <View className="flex-row space-x-2">
          {!isMetric ? (
            <>
              {/* Feet Picker */}
              <View className="bg-white rounded-xl px-2">
                <WheelPickerExpo
                  height={150}
                  width={100}
                  items={feet.map((item) => ({ label: `${item} ft`, value: item }))}
                  selected={heightFt}
                  onChange={(val) => setHeightFt(val)}
                  backgroundColor="transparent"
                />
              </View>
              {/* Inches Picker */}
              <View className="bg-white rounded-xl px-2">
                <WheelPickerExpo
                  height={150}
                  width={100}
                  items={inches.map((item) => ({ label: `${item} in`, value: item }))}
                  selected={heightIn}
                  onChange={(val) => setHeightIn(val)}
                  backgroundColor="transparent"
                />
              </View>
            </>
          ) : (
            <View className="bg-white rounded-xl px-4">
              <WheelPickerExpo
                height={150}
                width={100}
                items={cm.map((item) => ({ label: `${item} cm`, value: item }))}
                selected={heightCm}
                onChange={(val) => setHeightCm(val)}
                backgroundColor="transparent"
              />
            </View>
          )}
        </View>

        {/* Weight Picker */}
        <View className="bg-white rounded-xl px-4">
          <WheelPickerExpo
            height={150}
            width={100}
            items={isMetric 
              ? kg.map((item) => ({ label: `${item} kg`, value: item }))
              : lbs.map((item) => ({ label: `${item} lb`, value: item }))
            }
            selected={isMetric ? weightKg : weightLbs}
            onChange={(val) => isMetric ? setWeightKg(val) : setWeightLbs(val)}
            backgroundColor="transparent"
          />
        </View>
      </View>
    </View>
  );
}
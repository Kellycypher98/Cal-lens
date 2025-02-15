import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, Switch } from 'react-native';

export default function BMIPicker({ navigation }) {
  const [unit, setUnit] = useState('imperial'); // 'imperial' or 'metric'
  const [height, setHeight] = useState({ feet: 5, inches: 6 }); // Imperial
  const [metricHeight, setMetricHeight] = useState(168); // Metric (cm)
  const [weight, setWeight] = useState(160); // Imperial (lbs)
  const [metricWeight, setMetricWeight] = useState(73); // Metric (kg)
  
  // Generate height options
  const feetOptions = Array.from({ length: 7 }, (_, i) => i + 2); // 2-8 feet
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i + 1); // 1-12 inches
  
  // Generate weight options
  const weightOptions = Array.from({ length: 221 }, (_, i) => i + 80); // 80-300 lbs
  const cmOptions = Array.from({ length: 121 }, (_, i) => i + 120); // 120-240 cm
  const kgOptions = Array.from({ length: 131 }, (_, i) => i + 40); // 40-170 kg
  
  // Convert between imperial and metric
  useEffect(() => {
    if (unit === 'imperial') {
      // Convert metric to imperial
      const totalCm = metricHeight;
      const totalInches = Math.round(totalCm / 2.54);
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      setHeight({ feet, inches });
      
      // Convert kg to lbs
      setWeight(Math.round(metricWeight * 2.20462));
    } else {
      // Convert imperial to metric
      const totalInches = height.feet * 12 + height.inches;
      setMetricHeight(Math.round(totalInches * 2.54));
      
      // Convert lbs to kg
      setMetricWeight(Math.round(weight / 2.20462));
    }
  }, [unit]);
  
  const calculateBMI = () => {
    if (unit === 'imperial') {
      const heightInInches = height.feet * 12 + height.inches;
      return ((weight / (heightInInches * heightInInches)) * 703).toFixed(1);
    } else {
      const heightInMeters = metricHeight / 100;
      return (metricWeight / (heightInMeters * heightInMeters)).toFixed(1);
    }
  };
  
  const getBMICategory = (bmi) => {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return 'Underweight';
    if (bmiNum < 25) return 'Normal weight';
    if (bmiNum < 30) return 'Overweight';
    return 'Obese';
  };
  
  const handleNext = () => {
    // Navigate to next screen with collected data
    if (unit === 'imperial') {
      navigation.navigate('NextScreen', { 
        height, 
        weight, 
        unit,
        bmi: calculateBMI()
      });
    } else {
      navigation.navigate('NextScreen', { 
        height: metricHeight, 
        weight: metricWeight, 
        unit,
        bmi: calculateBMI()
      });
    }
  };
  
  const renderImperialSelectors = () => (
    <View className="flex-row mt-8">
      <View className="flex-1 mr-2">
        <Text className="text-lg font-semibold mb-3">Feet</Text>
        <ScrollView 
          className="h-64 bg-gray-50 rounded-xl" 
          showsVerticalScrollIndicator={false}
        >
          {feetOptions.map((ft) => (
            <TouchableOpacity
              key={`ft-${ft}`}
              onPress={() => setHeight({ ...height, feet: ft })}
              className={`py-3 px-5 rounded-full mx-2 my-1 ${
                height.feet === ft ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-center ${height.feet === ft ? 'font-bold' : ''}`}>
                {ft} ft
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View className="flex-1 mr-2">
        <Text className="text-lg font-semibold mb-3">Inches</Text>
        <ScrollView 
          className="h-64 bg-gray-50 rounded-xl" 
          showsVerticalScrollIndicator={false}
        >
          {inchesOptions.map((inch) => (
            <TouchableOpacity
              key={`in-${inch}`}
              onPress={() => setHeight({ ...height, inches: inch })}
              className={`py-3 px-5 rounded-full mx-2 my-1 ${
                height.inches === inch ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-center ${height.inches === inch ? 'font-bold' : ''}`}>
                {inch} in
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-3">Weight (lbs)</Text>
        <ScrollView 
          className="h-64 bg-gray-50 rounded-xl" 
          showsVerticalScrollIndicator={false}
        >
          {weightOptions.map((w) => (
            <TouchableOpacity
              key={`w-${w}`}
              onPress={() => setWeight(w)}
              className={`py-3 px-5 rounded-full mx-2 my-1 ${
                weight === w ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-center ${weight === w ? 'font-bold' : ''}`}>
                {w} lb
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
  
  const renderMetricSelectors = () => (
    <View className="flex-row mt-8">
      <View className="flex-1 mr-4">
        <Text className="text-lg font-semibold mb-3">Height (cm)</Text>
        <ScrollView 
          className="h-64 bg-gray-50 rounded-xl" 
          showsVerticalScrollIndicator={false}
        >
          {cmOptions.map((cm) => (
            <TouchableOpacity
              key={`cm-${cm}`}
              onPress={() => setMetricHeight(cm)}
              className={`py-3 px-5 rounded-full mx-2 my-1 ${
                metricHeight === cm ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-center ${metricHeight === cm ? 'font-bold' : ''}`}>
                {cm} cm
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View className="flex-1">
        <Text className="text-lg font-semibold mb-3">Weight (kg)</Text>
        <ScrollView 
          className="h-64 bg-gray-50 rounded-xl" 
          showsVerticalScrollIndicator={false}
        >
          {kgOptions.map((kg) => (
            <TouchableOpacity
              key={`kg-${kg}`}
              onPress={() => setMetricWeight(kg)}
              className={`py-3 px-5 rounded-full mx-2 my-1 ${
                metricWeight === kg ? 'bg-gray-200' : 'bg-gray-100'
              }`}
            >
              <Text className={`text-center ${metricWeight === kg ? 'font-bold' : ''}`}>
                {kg} kg
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
  
  const bmi = calculateBMI();
  const bmiCategory = getBMICategory(bmi);
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-6 flex-1">
        <Text className="text-4xl font-bold text-black">Height & weight</Text>
        <Text className="text-base text-gray-700 mt-2">
          This will be used to calibrate your custom plan.
        </Text>
        
        {/* Unit Toggle */}
        <View className="flex-row items-center justify-between mt-8">
          <Text className={`text-lg font-semibold ${unit === 'imperial' ? 'text-black' : 'text-gray-400'}`}>
            Imperial
          </Text>
          <Switch
            value={unit === 'metric'}
            onValueChange={(value) => setUnit(value ? 'metric' : 'imperial')}
            trackColor={{ false: '#f4f4f5', true: '#f4f4f5' }}
            thumbColor={unit === 'metric' ? '#10b981' : '#d4d4d8'}
            ios_backgroundColor="#f4f4f5"
          />
          <Text className={`text-lg font-semibold ${unit === 'metric' ? 'text-black' : 'text-gray-400'}`}>
            Metric
          </Text>
        </View>
        
        {/* Display current selection and BMI */}
        <View className="mt-6 bg-gray-50 rounded-xl p-4">
          <Text className="text-base text-gray-500">Current selection:</Text>
          {unit === 'imperial' ? (
            <Text className="text-lg font-medium mt-1">
              {height.feet}'{height.inches}" · {weight} lbs
            </Text>
          ) : (
            <Text className="text-lg font-medium mt-1">
              {metricHeight} cm · {metricWeight} kg
            </Text>
          )}
          <View className="flex-row items-center mt-3">
            <Text className="text-base text-gray-500">BMI:</Text>
            <Text className="text-lg font-medium ml-2">{bmi}</Text>
            <View className="ml-3 bg-gray-200 rounded-full px-3 py-1">
              <Text className="text-sm">{bmiCategory}</Text>
            </View>
          </View>
        </View>
        
        {/* Render appropriate selectors based on unit */}
        {unit === 'imperial' ? renderImperialSelectors() : renderMetricSelectors()}
      </View>
      
      <View className="px-6 py-6 mt-auto">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-black rounded-full py-4"
        >
          <Text className="text-white text-center text-lg font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
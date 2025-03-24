import { View, Text } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { useState } from 'react';
import useOnboardingStore from '../store/onboardingStore';

export default function AgePicker() {
  const { setUserData } = useOnboardingStore();
  const [year, setYear] = useState(new Date().getFullYear() - 25);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);

  // Generate arrays for the pickers
  const years = Array.from(
    { length: 100 }, 
    (_, i) => (new Date().getFullYear() - i).toString()
  );
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const days = Array.from(
    { length: 31 }, 
    (_, i) => (i + 1).toString().padStart(2, '0')
  );

  const handleDateChange = (type: string, value: string) => {
    if (type === 'year') {
      setYear(parseInt(value));
    } else if (type === 'month') {
      setMonth(months.indexOf(value) + 1);
    } else {
      setDay(parseInt(value));
    }

    const age = new Date().getFullYear() - parseInt(value);
    setUserData({ age: age.toString() });
  };

  return (
    <View>
      <Text className="text-lg font-bold mb-2">Select Your Birth Date</Text>
      <View className="flex-row space-x-2">
        <View className="bg-white rounded-xl px-2">
          <WheelPickerExpo
            height={150}
            width={100}
            items={months.map((item) => ({ label: item, value: item }))}
            selected={months[month - 1]}
            onChange={(val) => handleDateChange('month', val)}
            backgroundColor="transparent"
          />
        </View>
        <View className="bg-white rounded-xl px-2">
          <WheelPickerExpo
            height={150}
            width={100}
            items={days.map((item) => ({ label: item, value: item }))}
            selected={day.toString().padStart(2, '0')}
            onChange={(val) => handleDateChange('day', val)}
            backgroundColor="transparent"
          />
        </View>
        <View className="bg-white rounded-xl px-2">
          <WheelPickerExpo
            height={150}
            width={100}
            items={years.map((item) => ({ label: item, value: item }))}
            selected={year.toString()}
            onChange={(val) => handleDateChange('year', val)}
            backgroundColor="transparent"
          />
        </View>
      </View>
    </View>
  );
}
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import useOnboardingStore from '../store/onboardingStore';

export default function AgePicker() {
  const { setUserData } = useOnboardingStore();
  const [date, setDate] = useState(new Date());

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
      const age = new Date().getFullYear() - selectedDate.getFullYear();
      setUserData({ age: age.toString() });
    }
  };

  return (
    <View>
      <Text className="text-lg font-bold mb-2">Select Your Birth Year</Text>
      <DateTimePicker textColor='black' value={date} mode="date" display="spinner" onChange={handleDateChange} />
    </View>
  );
}
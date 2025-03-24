import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  age: number;
  height: number;
  weight: number;
  goal: string;
  gender: string;
  activityLevel: string;
  setUserData: (data: Partial<OnboardingState>) => void;
  completeOnboarding: () => Promise<void>;
}

const useOnboardingStore = create<OnboardingState>((set) => ({
  age: 0,
  height: 0,
  weight: 0,
  goal: '',
  gender: '',
  activityLevel: '',
  setUserData: (data) => set((state) => ({ ...state, ...data })),
  completeOnboarding: async () => {
    try {
      const currentState = useOnboardingStore.getState();
      await AsyncStorage.setItem('onboardingComplete', 'true');
      await AsyncStorage.setItem('userData', JSON.stringify({
        age: currentState.age,
        height: currentState.height, 
        weight: currentState.weight,
        goal: currentState.goal,
        gender: currentState.gender,
        activityLevel: currentState.activityLevel
      }));
    } catch (error) {
      console.error('Error saving onboarding data:', error);
    }
  },
}));

export default useOnboardingStore;
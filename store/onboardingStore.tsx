import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OnboardingState {
  age: string;
  height: string;
  weight: string;
  goal: string;
  activityLevel: string;
  setUserData: (data: Partial<OnboardingState>) => void;
  completeOnboarding: () => Promise<void>;
}

const useOnboardingStore = create<OnboardingState>((set) => ({
  age: '',
  height: '',
  weight: '',
  goal: '',
  activityLevel: '',
  setUserData: (data) => set((state) => ({ ...state, ...data })),
  completeOnboarding: async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
  },
}));

export default useOnboardingStore;
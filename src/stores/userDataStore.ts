import AsyncStorage from '@react-native-async-storage/async-storage';
import create, {StateCreator} from 'zustand';
import {persist, PersistOptions} from 'zustand/middleware';

export type userDataState = {
  userData: any;
  isOnboardingViewed: boolean;
  setUserData: (userData: any) => void;
  setIsOnboardingViewed: (isOnboardingViewed: boolean) => void;
};

type UserDataPersist = (
  config: StateCreator<userDataState>,
  options: PersistOptions<userDataState>,
) => StateCreator<userDataState>;

export const userDataStore = create<userDataState>(
  (persist as UserDataPersist)(
    set => ({
      userData: {},
      isOnboardingViewed: false,
      setUserData: (userData: any) => set({userData}),
      setIsOnboardingViewed: (isOnboardingViewed: boolean) =>
        set({isOnboardingViewed}),
    }),
    {
      name: 'userData-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default userDataStore;

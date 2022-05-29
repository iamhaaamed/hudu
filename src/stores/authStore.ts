import AsyncStorage from '@react-native-async-storage/async-storage';
import create, {StateCreator} from 'zustand';
import {persist, PersistOptions} from 'zustand/middleware';

export type AuthState = {
  isUserLoggedIn: boolean;
  isLoadingLogin: boolean;
  setIsLoadingLogin: (isLoadingLogin: boolean) => void;
  setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
};

type AuthPersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>,
) => StateCreator<AuthState>;

export const authStore = create<AuthState>(
  (persist as AuthPersist)(
    set => ({
      isUserLoggedIn: false,
      isLoadingLogin: false,
      setIsLoadingLogin: (isLoadingLogin: boolean) => set({isLoadingLogin}),
      setIsUserLoggedIn: (isUserLoggedIn: boolean) => set({isUserLoggedIn}),
    }),
    {
      name: 'auth-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default authStore;

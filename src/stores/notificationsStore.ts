import AsyncStorage from '@react-native-async-storage/async-storage';
import create, {StateCreator} from 'zustand';
import {persist, PersistOptions} from 'zustand/middleware';

type notificationsType = {
  count: number;
  setCount: (count: number) => void;
};

type NotificationsPersist = (
  config: StateCreator<notificationsType>,
  options: PersistOptions<notificationsType>,
) => StateCreator<notificationsType>;

export const notificationsStore = create<notificationsType>(
  (persist as NotificationsPersist)(
    set => ({
      count: 0,
      setCount: (count: number) => set({count}),
    }),
    {
      name: 'notifications-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default notificationsStore;

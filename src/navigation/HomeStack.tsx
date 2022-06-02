import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, NotificationScreen} from '~/screens';
import {CustomHeader} from '~/components/atoms/CustomHeader';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
  Notification: undefined;
};

const navigatorOptions = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
  },
];

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen
          key={screen.name}
          options={{
            headerTitle: screen.name,
            headerShown: screen.name != 'Home',
            header: (props: any) => <CustomHeader {...props} />,
          }}
          {...screen}
        />
      ))}
    </Stack.Navigator>
  );
}

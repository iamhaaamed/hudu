import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '~/screens';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  Profile: undefined;
};

const navigatorOptions = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Profile',
    component: ProfileScreen,
  },
];

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

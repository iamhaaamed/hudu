import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '~/screens';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
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
];

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

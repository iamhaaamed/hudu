import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FavoriteScreen} from '~/screens';

const Stack = createNativeStackNavigator();

export type FavoriteStackParamList = {
  Favorite: undefined;
};

const navigatorOptions = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Favorite',
    component: FavoriteScreen,
  },
];

export default function FavoriteStack() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

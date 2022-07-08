import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProjectsScreen} from '~/screens';

const Stack = createNativeStackNavigator();

export type ProjectStackParamList = {Projects: {pageNumber?: number}};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Projects',
    component: ProjectsScreen,
    options: publicScreenOption,
    initialParams: {pageNumber: 0},
  },
];

export default function ProjectsStack() {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

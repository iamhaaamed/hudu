import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PostScreen, PreviewPostScreen} from '~/screens';

const Stack = createNativeStackNavigator();

export type PostStackParamList = {
  Post: undefined;
  PreviewPost: undefined;
};

const navigatorOptions = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Post',
    component: PostScreen,
  },
  {
    name: 'PreviewPost',
    component: PreviewPostScreen,
  },
];

export default function PostStack() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

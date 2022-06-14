import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import MainTabs from './MainTabs';
import ProfileStack from './ProfileStack';
import {CustomHeader} from '~/components';
import {NotificationScreen} from '~/screens';

const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  MainTabs: undefined;
  AuthStack: undefined;
  Notification: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'MainTabs',
    component: MainTabs,
    options: publicScreenOption,
  },
  {
    name: 'AuthStack',
    component: ProfileStack,
    options: publicScreenOption,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    options: {
      headerTitle: 'Notification',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
];

export default function MainStack() {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

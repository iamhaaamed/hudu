import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import MainTabs from './MainTabs';
import ProfileStack from './ProfileStack';
import {CustomHeader} from '~/components';
import {
  NotificationScreen,
  ProjectDetailsHudurScreen,
  ListerProfileScreen,
  HudurProfileScreen,
  HudurProfileListerScreen,
  SearchScreen,
} from '~/screens';

const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  MainTabs: undefined;
  AuthStack: undefined;
  Notification: undefined;
  Search: undefined;
  ProjectDetailsHudur: {projectId?: number};
  ListerProfile: {userId?: number};
  HudurProfile: {userId?: number};
  HudurProfileLister: undefined;
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
  {
    name: 'ProjectDetailsHudur',
    component: ProjectDetailsHudurScreen,
    options: publicScreenOption,
  },
  {
    name: 'ListerProfile',
    component: ListerProfileScreen,
    options: {
      headerTitle: 'Profile',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'HudurProfile',
    component: HudurProfileScreen,
    options: {
      headerTitle: 'Profile',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'Search',
    component: SearchScreen,
    options: publicScreenOption,
  },
  {
    name: 'HudurProfileLister',
    component: HudurProfileListerScreen,
    options: {
      headerTitle: 'Profile',
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

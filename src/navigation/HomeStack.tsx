import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeScreen,
  ProjectDetailsHudurScreen,
  ListerProfileScreen,
  HudurProfileScreen,
  SearchScreen,
} from '~/screens';
import {CustomHeader} from '~/components';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
  ProjectDetailsHudur: {projectId?: number};
  ListerProfile: undefined;
  HudurProfile: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Home',
    component: HomeScreen,
    options: publicScreenOption,
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
];

export default function HomeStack() {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

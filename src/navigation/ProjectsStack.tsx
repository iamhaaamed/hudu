import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProjectsScreen,
  ProjectDetailsListerScreen,
  HudurProfileListerScreen,
  ListerProfileScreen,
  HudurProfileScreen,
} from '~/screens';
import {CustomHeader} from '~/components';
import ProjectDetailsHudurScreen from './../screens/Home/ProjectDetailsHudurScreen/index';

const Stack = createNativeStackNavigator();

export type ProjectStackParamList = {
  Projects: {pageNumber?: number};
  ProjectDetailsLister: undefined;
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
    name: 'Projects',
    component: ProjectsScreen,
    options: publicScreenOption,
    initialParams: {pageNumber: 0},
  },
  {
    name: 'ProjectDetailsLister',
    component: ProjectDetailsListerScreen,
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
    name: 'HudurProfileLister',
    component: HudurProfileListerScreen,
    options: {
      headerTitle: 'Profile',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
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

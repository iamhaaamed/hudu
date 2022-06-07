import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProjectsScreen,
  ProjectDetailsListerScreen,
  HudurProfileListerScreen,
} from '~/screens';
import {CustomHeader} from '~/components/atoms/CustomHeader';

const Stack = createNativeStackNavigator();

export type ProjectStackParamList = {
  Projects: undefined;
  ProjectDetailsLister: undefined;
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
  },
  {
    name: 'ProjectDetailsLister',
    component: ProjectDetailsListerScreen,
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

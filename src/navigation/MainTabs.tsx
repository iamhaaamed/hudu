import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import {CustomTabBar} from '~/components';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import PostStack from './PostStack';
import ProjectsStack from './ProjectsStack';
import {authStore} from '~/stores';
import {AuthScreen, ProfileScreen} from '~/screens';

const Tab = createBottomTabNavigator();

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'HomeStack',
    component: HomeStack,
    options: publicScreenOption,
  },
  {
    name: 'FavoriteStack',
    component: FavoriteStack,
    options: publicScreenOption,
  },
  {
    name: 'PostStack',
    component: PostStack,
    options: publicScreenOption,
  },
  {
    name: 'ProjectsStack',
    component: ProjectsStack,
    options: publicScreenOption,
  },
];

const MainTabs = () => {
  const {isUserLoggedIn} = authStore(state => state);
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
      {screens.map(screen => (
        //@ts-ignore
        <Tab.Screen key={screen.name} {...screen} />
      ))}
      <Tab.Screen
        name="ProfileStack"
        component={isUserLoggedIn ? ProfileScreen : AuthScreen}
        options={publicScreenOption}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

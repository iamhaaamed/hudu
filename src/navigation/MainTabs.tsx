import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CommonActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {CustomTabBar} from '~/components';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import PostStack from './PostStack';
import ProjectsStack from './ProjectsStack';
import ProfileStack from './ProfileStack';
import {TabBarContextProvider} from '~/context/TabBarContext';

const Tab = createBottomTabNavigator();

const navigatorOptions = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'HomeStack',
    component: HomeStack,
  },
  {
    name: 'FavoriteStack',
    component: FavoriteStack,
  },
  {
    name: 'PostStack',
    component: PostStack,
  },
  {
    name: 'ProjectsStack',
    component: ProjectsStack,
  },
  {
    name: 'ProfileStack',
    component: ProfileStack,
  },
];

const MainTabs = () => {
  return (
    <TabBarContextProvider>
      <Tab.Navigator
        screenOptions={navigatorOptions}
        tabBar={(props: any) => <CustomTabBar {...props} />}>
        {screens.map(screen => (
          //@ts-ignore
          <Tab.Screen key={screen.name} {...screen} />
        ))}
      </Tab.Navigator>
    </TabBarContextProvider>
  );
};

export default MainTabs;

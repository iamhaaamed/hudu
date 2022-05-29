import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CustomTabBar} from '~/components';
import HomeStack from './HomeStack';
import FavoriteStack from './FavoriteStack';
import PostStack from './PostStack';
import ProjectsStack from './ProjectsStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen
        backBehavior="firstRoute"
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: 'home-outline',
        }}
      />
      <Tab.Screen
        name="FavoriteStack"
        component={FavoriteStack}
        options={{
          headerShown: false,
          tabBarIcon: 'calendar-blank',
        }}
      />

      <Tab.Screen
        name="PostStack"
        component={PostStack}
        options={{
          headerShown: false,
          tabBarIcon: 'chat-outline',
        }}
      />
      <Tab.Screen
        name="ProjectsStack"
        component={ProjectsStack}
        options={{
          headerShown: false,
          tabBarIcon: 'account-outline',
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: 'account-outline',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;

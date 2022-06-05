import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {CustomHeader} from '~/components/atoms/CustomHeader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProfileScreen,
  ReviewsScreen,
  EditProfileScreen,
  NotificationScreen,
  SupportScreen,
  AuthScreen,
} from '~/screens';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  Auth: undefined;
  Profile: undefined;
  Reviews: undefined;
  Support: undefined;
  EditProfile: undefined;
  Notification: undefined;
};

const navigatorOptions = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'EditProfile',
    component: EditProfileScreen,
  },
  {
    name: 'Reviews',
    component: ReviewsScreen,
  },
  {
    name: 'Support',
    component: SupportScreen,
  },
  {
    name: 'Auth',
    component: AuthScreen,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
  },
];

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={navigatorOptions}>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen
          key={screen.name}
          options={{
            headerTitle: screen.name,
            headerShown: screen.name != 'Profile',
            header: (props: any) => <CustomHeader {...props} />,
          }}
          {...screen}
        />
      ))}
    </Stack.Navigator>
  );
}

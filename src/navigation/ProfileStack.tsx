import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen, EditProfileScreen, NotificationScreen} from '~/screens';
import {CustomHeader} from '~/components/atoms/CustomHeader';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  Profile: undefined;
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

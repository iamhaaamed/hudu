import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ReviewsScreen,
  EditProfileScreen,
  NotificationScreen,
  SupportScreen,
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  AuthScreen,
} from '~/screens';
import {CustomHeader} from '~/components';
import {authStore} from '~/stores';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Reviews: undefined;
  Support: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Auth: undefined;
};

const profileScreens = [
  {
    name: 'EditProfile',
    component: EditProfileScreen,
    options: {
      headerTitle: 'Edit profile',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'Reviews',
    component: ReviewsScreen,
    options: {
      headerTitle: 'Reviews',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'Support',
    component: SupportScreen,
    options: {
      headerTitle: 'Support',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    options: {
      headerTitle: 'Notification',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
];

const authScreens = [
  {
    name: 'Auth',
    component: AuthScreen,
    options: {
      headerTitle: '',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerTitle: 'Login',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: {
      headerTitle: 'Create account',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    options: {
      headerTitle: 'Forgot password',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
];

export default function ProfileStack() {
  const {isUserLoggedIn} = authStore(state => state);

  return (
    <Stack.Navigator>
      {isUserLoggedIn
        ? profileScreens.map(screen => (
            //@ts-ignore
            <Stack.Screen key={screen.name} {...screen} />
          ))
        : authScreens.map(screen => (
            //@ts-ignore
            <Stack.Screen key={screen.name} {...screen} />
          ))}
    </Stack.Navigator>
  );
}

import React from 'react';
import {
  CommonActions,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {CustomHeader} from '~/components/atoms/CustomHeader';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ProfileScreen,
  ReviewsScreen,
  EditProfileScreen,
  NotificationScreen,
  SupportScreen,
  AuthScreen,
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
} from '~/screens';
import {useTabBar} from '~/context/TabBarContext';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  Auth: undefined;
  Login: undefined;
  SignUp: undefined;
  Profile: undefined;
  Reviews: undefined;
  Support: undefined;
  EditProfile: undefined;
  Notification: undefined;
  ForgotPassword: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Profile',
    component: ProfileScreen,
    options: publicScreenOption,
  },
  {
    name: 'EditProfile',
    component: EditProfileScreen,
    options: {
      headerTitle: undefined,
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'Reviews',
    component: ReviewsScreen,
    options: {
      headerTitle: 'Reviews',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'Support',
    component: SupportScreen,
    options: {
      headerTitle: 'Support',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'Auth',
    component: AuthScreen,
    options: {
      headerTitle: undefined,
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerTitle: 'Login',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: {
      headerTitle: 'Create account',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    options: {
      headerTitle: 'Forgot password',
      headerShown: true,
      header: (props: any) => <CustomHeader {...props} />,
    },
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
];

const tabHiddenRoutes = ['Auth', 'Login', 'SignUp', 'ForgotPassword'];

export default function ProfileStack({navigation, route}: any) {
  const {changeTabBarVisibility} = useTabBar();

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (tabHiddenRoutes.includes(routeName as string))
      changeTabBarVisibility(true);
    else changeTabBarVisibility(false);
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}

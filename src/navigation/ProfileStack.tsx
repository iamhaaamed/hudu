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
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
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

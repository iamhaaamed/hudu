import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingScreen, SplashScreen} from '~/screens';
import MainStack from './MainStack';

const Stack = createNativeStackNavigator();

const navigatorOptions = {
  headerShown: false,
};

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="onBoarding" component={OnboardingScreen} />
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

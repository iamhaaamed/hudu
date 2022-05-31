import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingScreen, SplashScreen} from '~/screens';
import MainStack from './MainStack';
import {userDataStore} from '~/stores';
import {navigationRef} from './Methods';

const Stack = createNativeStackNavigator();

const navigatorOptions = {
  headerShown: false,
};

export default function AppNavigator() {
  const {isOnboardingViewed} = userDataStore(state => state);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    continueApp();
  }, []);

  const continueApp = async () => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  };

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={navigatorOptions}>
        {!isOnboardingViewed && (
          <Stack.Screen name={'onBoarding'} component={OnboardingScreen} />
        )}
        <Stack.Screen name="MainStack" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

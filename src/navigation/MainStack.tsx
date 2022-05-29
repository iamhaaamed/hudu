import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabs from './MainTabs';

const Stack = createNativeStackNavigator();

export type MainStackParamList = {
  MainTabs: undefined;
};

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        key={'MainTabNavigator'}
        name={'MainTabs'}
        component={MainTabs}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

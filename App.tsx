import React from 'react';
import AppNavigator from '~/navigation/AppNavigator';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;

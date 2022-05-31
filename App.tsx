import React from 'react';
import {SafeAreaView, StyleSheet, Platform, UIManager} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import AppNavigator from '~/navigation/AppNavigator';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <SafeAreaView style={styles.flex1}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});

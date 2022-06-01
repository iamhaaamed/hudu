import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  UIManager,
  StatusBar,
} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import AppNavigator from '~/navigation/AppNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors} from '~/styles';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  return (
    <SafeAreaView style={styles.flex1}>
      <GestureHandlerRootView style={styles.flex1}>
        <NativeBaseProvider>
          <AppNavigator />
          <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});

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
import {QueryClient, QueryClientProvider} from 'react-query';
import FlashMessage from 'react-native-flash-message';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        cacheTime: 20000,
      },
    },
  });

  return (
    <SafeAreaView style={styles.flex1}>
      <GestureHandlerRootView style={styles.flex1}>
        <NativeBaseProvider>
          <QueryClientProvider client={queryClient}>
            <AppNavigator />
            <StatusBar backgroundColor={Colors.WHITE} barStyle="dark-content" />
            <FlashMessage duration={5000} />
          </QueryClientProvider>
        </NativeBaseProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});

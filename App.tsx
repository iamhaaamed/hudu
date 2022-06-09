import React, {useEffect, useState, useCallback} from 'react';
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
import {QueryClient, QueryClientProvider, QueryCache} from 'react-query';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {ResponseStatus} from '~/generated/graphql';
import auth from '@react-native-firebase/auth';
import {authStore, userDataStore} from '~/stores';
import graphQLClient from 'src/graphql/graphQLClient';
import {useSignOutAuth} from '~/hooks/user';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App = () => {
  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);

  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const {signOut} = useSignOutAuth();

  const logOut = async () => {
    await signOut();
    setUserData({});
    setIsUserLoggedIn(false);
  };

  const handleUser = useCallback(
    async user => {
      if (user) {
        const idToken = await auth().currentUser?.getIdToken();
        console.log('idToken', idToken);
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          setLoading(false);
        }
        queryClient.invalidateQueries();
      } else {
        graphQLClient.setHeader('authorization', '');
        queryClient.clear();
        logOut();
        setLoading(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, [handleUser]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        cacheTime: 20000,
      },
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        console.log(error);
        showMessage({
          message: `Something went wrong: ${error.message}`,
          type: 'danger',
        });
      },
      onSuccess: async (data: any) => {
        const apiName = Object.keys(data)[0];
        const first = data[apiName];
        const status = first?.status;

        if (
          status === ResponseStatus.AuthenticationFailed ||
          (Array.isArray(first) &&
            first[0][Object.keys(first[0])[0]].status ===
              ResponseStatus.AuthenticationFailed)
        ) {
          try {
            await auth().signOut();
          } catch (error) {
            setIsUserLoggedIn(false);
            setUserData({});
          }
        }
      },
    }),
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

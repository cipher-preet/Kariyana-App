import React, { useEffect } from 'react';
import { BackHandler, Platform } from 'react-native';
import {
  createNavigationContainerRef,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store } from './src/ReduxToolKit/Rtk/store';
import RootNavigator from './src/navigation/RootNavigator';
import AuthStack from './src/navigation/AuthStack';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { loadUserFromStorage } from './utils/authLoader';
import { useAppDispatch } from './utils/hooks';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef<any>();

const getActiveChild = (route: any) => {
  const state = route?.state;

  if (!state?.routes?.length) {
    return null;
  }

  return state.routes[state.index ?? 0];
};

const handleAndroidBack = () => {
  if (Platform.OS !== 'android' || !navigationRef.isReady()) {
    return false;
  }

  const rootState = navigationRef.getRootState();
  const rootRoute = rootState.routes[rootState.index ?? 0];

  if (!rootRoute) {
    return true;
  }

  if (rootRoute.name === 'App') {
    const activeTab = getActiveChild(rootRoute);
    const activeScreen = getActiveChild(activeTab);

    if (activeScreen?.name === 'OrderProcessing') {
      return true;
    }

    if ((activeTab?.state?.index ?? 0) > 0) {
      navigationRef.goBack();
      return true;
    }

    if (activeTab?.name && activeTab.name !== 'Home') {
      navigationRef.navigate('App', {
        screen: 'Home',
        params: { screen: 'HomeMain' },
      });
      return true;
    }

    return true;
  }

  if (rootRoute.name === 'Auth') {
    const activeAuthScreenIndex = rootRoute.state?.index ?? 0;

    if (activeAuthScreenIndex > 0) {
      navigationRef.goBack();
    }

    return true;
  }

  if (navigationRef.canGoBack()) {
    navigationRef.goBack();
  }

  return true;
};

const MainApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleAndroidBack,
    );

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthProvider>
          <Stack.Navigator
            initialRouteName="Root"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Root" component={RootNavigator} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="App" component={AppNavigator} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

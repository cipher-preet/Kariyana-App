import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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

const MainApp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
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

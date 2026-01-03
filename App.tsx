import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { applyGlobalTextStyle } from './src/config/globalText';
import RootNavigator from './src/navigation/RootNavigator';

import { Provider } from 'react-redux';
import { store } from './src/ReduxToolKit/Rtk/store';

applyGlobalTextStyle();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

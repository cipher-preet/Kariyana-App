import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/Account/AccountScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen/MyOrdersScreen';
import OrderDetailsScreen from '../screens/MyOrdersScreen/OrderDetailsScreen';

const Stack = createNativeStackNavigator();

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={AccountScreen} />
    <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
    <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
  </Stack.Navigator>
);

export default AccountStack;

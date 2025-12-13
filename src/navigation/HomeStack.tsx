import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import ProductDetailsScreen from '../screens/Product/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeMain" component={HomeScreen} />
    <Stack.Screen
  name="ProductDetails"
  component={ProductDetailsScreen}
  options={{ headerShown: false }}
/>
  </Stack.Navigator>
);

export default HomeStack;

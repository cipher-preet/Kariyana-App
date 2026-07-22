import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import ProductByCategory from '../screens/Categories/ProductByCategory';
import ProductDetailsScreen from '../screens/Product/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CategoriesMain" component={CategoriesScreen} />
    <Stack.Screen name="ProductGrid" component={ProductByCategory} />
    <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
  </Stack.Navigator>
);

export default CategoriesStack;

import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import ProductByCategory from '../screens/Categories/ProductByCategory';
import ProductDetailsScreen from '../screens/Product/ProductDetailsScreen';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="categoryMain" component={CategoriesScreen} />
    <Stack.Screen name="productgrid" component={ProductByCategory} />
    <Stack.Screen
      name="ProductDetailsNavigator"
      component={ProductDetailsScreen}
    />
  </Stack.Navigator>
);

export default CategoriesStack;

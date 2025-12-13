import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/Categories/CategoriesScreen";

const Stack = createNativeStackNavigator();

const CategoriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="categoryMain" component={CategoriesScreen} />
  </Stack.Navigator>
);

export default CategoriesStack;

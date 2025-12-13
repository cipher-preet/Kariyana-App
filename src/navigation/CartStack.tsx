import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../screens/Cart/CartScreen";

const Stack = createNativeStackNavigator();

const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="categoryMain" component={CartScreen} />
  </Stack.Navigator>
);

export default CartStack;

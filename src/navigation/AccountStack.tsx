import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../screens/Account/AccountScreen";
// import AccountScreen from "../screens/Home/CategoriesScreen";

const Stack = createNativeStackNavigator();

const AccountStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AccountMain" component={AccountScreen} />
  </Stack.Navigator>
);

export default AccountStack;

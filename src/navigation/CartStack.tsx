import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../screens/Cart/CartScreen';
import AddressScreen from '../screens/PaymentScreens/AddressScreen';
import PaymentScreen from '../screens/PaymentScreens/PaymentScreen';
import OrderProcessing from '../screens/PaymentScreens/OrderProcessing';
import OrderSuccess from '../screens/PaymentScreens/OrderSuccess';
import PaymentFailed from '../screens/PaymentScreens/PaymentFailed';

export type CartStackParamList = {
  CartMain: undefined;
  AddressScreen: {
    cartItems: any[];
    totalAmount: number;
    userId: string;
  };
  PaymentScreen: {
    userId: string;
    addressId: string;
    items: any[];
    totalAmount: number;
  };
  OrderProcessing:undefined;
  OrderSuccess:undefined;
  PaymentFailed:undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

const CartStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CartMain" component={CartScreen} />
    <Stack.Screen name="AddressScreen" component={AddressScreen} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} />

    <Stack.Screen name="OrderProcessing" component={OrderProcessing} />
    <Stack.Screen name="OrderSuccess" component={OrderSuccess} />
    <Stack.Screen name="PaymentFailed" component={PaymentFailed} />
  </Stack.Navigator>
);

export default CartStack;

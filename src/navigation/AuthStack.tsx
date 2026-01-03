import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Authantication/LoginScreen';
import OtpVerifyScreen from '../screens/Authantication/OtpVerifyScreen';
import RegisterStep1 from '../screens/Authantication/Register/RegisterStep1';
import RegisterStep2 from '../screens/Authantication/Register/RegisterStep2';
import RegisterStep3 from '../screens/Authantication/Register/RegisterStep3';
import AwaitingApproval from '../screens/Authantication/AwaitApprovalScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />

    <Stack.Screen name="RegisterStep1" component={RegisterStep1} />
    <Stack.Screen name="RegisterStep2" component={RegisterStep2} />
    <Stack.Screen name="RegisterStep3" component={RegisterStep3} />
    <Stack.Screen name="RegisterSuccess" component={AwaitingApproval} />
  </Stack.Navigator>
);

export default AuthStack;

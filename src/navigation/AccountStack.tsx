import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../screens/Account/AccountScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen/MyOrdersScreen';
import OrderDetailsScreen from '../screens/MyOrdersScreen/OrderDetailsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen/AnalyticsScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen/HelpCenterScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen/PersonalInfoScreen';
import FaqsScreen from '../screens/FaqsScreen/FaqsScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen/DeleteAccountScreen';
import BecameAPartnerScreen from '../screens/BecameAPartnerScreen/BecameAPartnerScreen';
import ShareFeedBackScreen from '../screens/ShareFeedBackScreen/ShareFeedBackScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen/PrivacyPolicyScreen';
import SavedAddressScreen from '../screens/SavedAddressScreen/SavedAddressScreen';

const Stack = createNativeStackNavigator();

const AccountStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="AccountMain"
  >
    <Stack.Screen name="AccountMain" component={AccountScreen} />

    <Stack.Screen name="MyOrdersScreen" component={MyOrdersScreen} />
    <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />

    <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
    <Stack.Screen name="SavedAddressScreen" component={SavedAddressScreen} /> 
    <Stack.Screen name="HelpcenterScreen" component={HelpCenterScreen} />
    <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
    <Stack.Screen name="FaqsScreen" component={FaqsScreen} />
    <Stack.Screen name="DeleteAccountScreen" component={DeleteAccountScreen} />
    <Stack.Screen
      name="BecameAPartnerScreen"
      component={BecameAPartnerScreen}
    />
    <Stack.Screen name="ShareFeedBackScreen" component={ShareFeedBackScreen} />
    <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
  </Stack.Navigator>
);

export default AccountStack;

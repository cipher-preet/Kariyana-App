import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/common/CustomTabBar';

import HomeStack from './HomeStack';
import CategoriesStack from './CategoriesStack';
import AccountStack from './AccountStack';
import CartStack from './CartStack';

const Tab = createBottomTabNavigator();

const renderCustomTabBar = (props: any) => <CustomTabBar {...props} />;

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={renderCustomTabBar}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="categories" component={CategoriesStack} />
      <Tab.Screen name="Account" component={AccountStack} />
      <Tab.Screen name="Cart" component={CartStack} />
    </Tab.Navigator>
  );
};

export default AppNavigator;

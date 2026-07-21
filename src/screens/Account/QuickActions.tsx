import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { Colors, Spacing, Radius } from '../../styles';
import {
  AddressIcon,
  ChartIcon,
  HelpIcon,
  OrdersIcon,
} from './AccountIcons';

const QuickActions = () => {
  const navigation = useNavigation<any>();

  const actions = [
    {
      title: 'Orders',
      icon: <OrdersIcon />,
      onPress: () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AccountMain' }, { name: 'MyOrdersScreen' }],
          }),
        ),
    },
    {
      title: 'Analytics',
      icon: <ChartIcon />,
      onPress: () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AccountMain' }, { name: 'AnalyticsScreen' }],
          }),
        ),
    },
    {
      title: 'Addresses',
      icon: <AddressIcon />,
      onPress: () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AccountMain' }, { name: 'SavedAddressScreen' }],
          }),
        ),
    },
    {
      title: 'Help',
      icon: <HelpIcon />,
      onPress: () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AccountMain' }, { name: 'HelpcenterScreen' }],
          }),
        ),
    },
  ];

  return (
    <View style={styles.grid}>
      {actions.map(item => (
        <QuickItem
          key={item.title}
          title={item.title}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </View>
  );
};

const QuickItem = ({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.86} onPress={onPress}>
    <View style={styles.icon}>{icon}</View>
    <Text style={styles.text} numberOfLines={1}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default QuickActions;

const styles = StyleSheet.create({
  grid: {
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 18,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.md,
  },

  item: {
    flex: 1,
    alignItems: 'center',
  },

  icon: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },

  text: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#202124',
  },
});

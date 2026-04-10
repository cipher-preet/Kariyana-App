import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { Colors, Spacing, Radius } from '../../styles';

const QuickActions = () => {
  const navigation = useNavigation<any>();

  const actions = [
    {
      title: 'My Orders',
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
      onPress: () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AccountMain' }, { name: 'AnalyticsScreen' }],
          }),
        ),
    },
    {
      title: 'Saved Addresses',
      onPress: () =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'AccountMain' }, { name: 'SavedAddressScreen' }],
          }),
        ),
    },
    {
      title: 'Help center',
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
      {actions.map((item, index) => (
        <QuickItem key={index} title={item.title} onPress={item.onPress} />
      ))}
    </View>
  );
};

const QuickItem = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={styles.item}
    activeOpacity={0.8}
    onPress={onPress}
  >
    <View style={styles.icon} />
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
    flexWrap: 'wrap',
    padding: Spacing.md,
    gap: Spacing.md,
  },

  item: {
    width: '48%',
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    borderRadius: Radius.sm,
    backgroundColor: Colors.success + '20',
    marginRight: Spacing.sm,
  },

  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray900,
  },
});

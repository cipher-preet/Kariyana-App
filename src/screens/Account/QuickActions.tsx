import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';

const QuickActions = () => {
  return (
    <View style={styles.grid}>
      <QuickItem title="My Orders" />
      <QuickItem title="Reminders" />
      <QuickItem title="Chat With Us" />
      <QuickItem title="Saved Addresses" />
    </View>
  );
};

const QuickItem = ({ title }: { title: string }) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.8}>
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

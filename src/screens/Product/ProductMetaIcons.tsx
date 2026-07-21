import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../styles';

const items = [
  ['Quality', 'Checked'],
  ['Bulk', 'Ready'],
  ['14-48 hrs', 'Delivery'],
  ['Order', 'Support'],
];

const ProductMetaIcons = () => {
  return (
    <View style={styles.row}>
      {items.map((item, index) => (
        <View key={item[0]} style={[styles.item, index !== 3 && styles.divider]}>
          <Text style={styles.main}>{item[0]}</Text>
          <Text style={styles.sub}>{item[1]}</Text>
        </View>
      ))}
    </View>
  );
};

export default ProductMetaIcons;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: 2,
  },
  divider: {
    borderRightWidth: 1,
    borderColor: Colors.gray100,
  },
  main: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray900,
  },
  sub: {
    fontSize: 10.5,
    color: Colors.gray600,
    marginTop: 2,
    fontWeight: '600',
  },
});

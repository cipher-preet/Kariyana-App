import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductMetaIcons = () => {
  return (
    <View style={styles.row}>
      {[
        ['7 Days', 'Replacement'],
        ['1 Year', 'Warranty'],
        ['24/7', 'Support'],
        ['Fast', 'Delivery'],
      ].map((item, index) => (
        <View
          key={index}
          style={[styles.item, index !== 3 && styles.divider]}
        >
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
    backgroundColor:"#ffffff"
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  main: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  sub: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
});

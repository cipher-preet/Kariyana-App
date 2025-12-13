import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductHeader = () => {
  return (
    <View>
      <Text style={styles.title} numberOfLines={2}>
        Impulse Curve Water Resistant Polyester Rucksack (80 ltrs, Black)
      </Text>

      <View style={styles.metaRow}>
        <Text style={styles.stock}>Only 1 left</Text>

        <View style={styles.dot} />

        <Text style={styles.delivery}>12 mins</Text>
      </View>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#1f1f1f',
    lineHeight: 21,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  stock: {
    fontSize: 12.5,
    color: '#d32f2f',
    fontWeight: '600',
  },

  delivery: {
    fontSize: 12.5,
    color: '#4caf50',
    fontWeight: '600',
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 6,
  },
});

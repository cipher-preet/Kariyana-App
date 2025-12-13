import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProductPriceSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.price}>₹989</Text>

        <Text style={styles.mrp}>₹5,500</Text>

        <View style={styles.offPill}>
          <Text style={styles.offText}>82% OFF</Text>
        </View>
      </View>

      <Text style={styles.tax}>Inclusive of all taxes</Text>
    </View>
  );
};

export default ProductPriceSection;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f1f1f',
  },

  mrp: {
    marginLeft: 8,
    fontSize: 13,
    color: '#9e9e9e',
    textDecorationLine: 'line-through',
  },

  offPill: {
    marginLeft: 8,
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  offText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2e7d32',
  },

  tax: {
    marginTop: 4,
    fontSize: 11.5,
    color: '#757575',
  },
});

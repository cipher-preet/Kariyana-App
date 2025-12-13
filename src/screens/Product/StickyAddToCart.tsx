import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StickyAddToCart = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>₹989</Text>
        <Text style={styles.unit}>1 unit</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.text}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StickyAddToCart;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
  },
  unit: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});

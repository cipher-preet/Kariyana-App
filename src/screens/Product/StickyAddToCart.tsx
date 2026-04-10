import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { addItemOptimistic } from '../../ReduxToolKit/Slices/cartSlice';
import { triggerCartSync } from '../../ReduxToolKit/Slices/cartSync';

const StickyAddToCart = ({ product }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (loading) return;

    setLoading(true);

    dispatch(
      addItemOptimistic({
        product: {
          productId: product._id,
          price: product.mrp,
        },
        userId: '694fc82c88c809473e4455c3', // to be static in future when we have auth implemented
      }),
    );

    setTimeout(() => {
      triggerCartSync();
      setLoading(false);
    }, 600);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.price}>₹{product.mrp}</Text>
        <Text style={styles.unit}>
          {product.quantityPerUnit} {product.unit}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAddToCart}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.text}>Add to cart</Text>
        )}
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

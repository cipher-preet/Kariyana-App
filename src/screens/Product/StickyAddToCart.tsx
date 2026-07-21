import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';

import { addItemOptimistic } from '../../ReduxToolKit/Slices/cartSlice';
import { triggerCartSync } from '../../ReduxToolKit/Slices/cartSync';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

const StickyAddToCart = ({ product }: any) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const user_Id = useSelector((state: any) => state.auth.userId);

  const [loading, setLoading] = useState(false);
  const isOutOfStock = product.sku === 0;
  const finalPrice = product.sellingPrice || product.mrp;

  const handleAddToCart = async () => {
    if (loading || isOutOfStock) return;

    setLoading(true);

    dispatch(
      addItemOptimistic({
        product: {
          productId: product._id,
          price: finalPrice,
        },
        userId: user_Id,
      }),
    );

    setTimeout(() => {
      triggerCartSync();
      setLoading(false);
    }, 600);
  };

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, Spacing.md) }]}>
      <View style={styles.priceBlock}>
        <Text style={styles.label}>Order price</Text>
        <Text style={styles.price}>Rs{finalPrice}</Text>
        <Text style={styles.unit} numberOfLines={1}>
          {product.quantityPerUnit} {product.unit}
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[styles.button, isOutOfStock && styles.disabledButton]}
        onPress={handleAddToCart}
        disabled={loading || isOutOfStock}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} size="small" />
        ) : (
          <Text style={styles.text}>
            {isOutOfStock ? 'Out of stock' : 'Add to cart'}
          </Text>
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
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: Colors.gray200,
    ...Shadows.card,
  },
  priceBlock: {
    flex: 1,
    minWidth: 0,
    paddingRight: Spacing.md,
  },
  label: {
    fontSize: 10.5,
    color: Colors.gray500,
    fontWeight: '500',
  },
  price: {
    marginTop: 1,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
  },
  unit: {
    marginTop: 1,
    fontSize: 11.5,
    color: Colors.gray600,
    fontWeight: '600',
  },
  button: {
    minWidth: 148,
    height: 48,
    backgroundColor: '#0B6B3A',
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.gray400,
  },
  text: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

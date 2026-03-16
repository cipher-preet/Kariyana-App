import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';
import type { Product } from '../../types';

import { useDispatch, useSelector } from 'react-redux';
import {
  addItemOptimistic,
  removeItemOptimistic,
} from '../../ReduxToolKit/Slices/cartSlice';
import { triggerCartSync } from '../../ReduxToolKit/Slices/cartSync';

const YELLOW_BG = '#FDE9A5';

type Props = {
  item: Product;
  onAdd?: (id: string, qty: number) => void;
};

const SaleCard: React.FC<Props> = ({ item, onAdd }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state: any) => state.cart.items[item._id]);
  const qty = cartItem?.quantity ?? 0;

  const increase = () => {
    dispatch(
      addItemOptimistic({
        product: {
          productId: item._id,
          price: item.mrp,
        },
        userId: '694fc82c88c809473e4455c3',
      }),
    );

    triggerCartSync();
    onAdd?.(item._id, qty + 1);
  };

  const decrease = () => {
    dispatch(removeItemOptimistic(item._id));
    triggerCartSync();

    onAdd?.(item._id, qty - 1);
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          source={{ uri: item.images }}
          style={styles.image}
          resizeMode="contain"
        />

        {qty === 0 ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={increase}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.addText}>ADD</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.stepper}>
            <TouchableOpacity
              onPress={decrease}
              style={styles.stepBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.stepTxt}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyTxt}>{qty}</Text>

            <TouchableOpacity
              onPress={increase}
              style={styles.stepBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.stepTxt}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {item.quantityPerUnit && (
        <Text style={styles.unitPrice}>
          {item.quantityPerUnit} {item.unit}
        </Text>
      )}

      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>

      <View style={styles.rateRow}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
        <Text style={styles.time}>24-48 hrs</Text>
      </View>

      <View style={styles.priceRowBg}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{item.sellingPrice}</Text>
          <Text style={styles.mrp}>₹{item.mrp}</Text>
        </View>
      </View>
    </View>
  );
};

export default SaleCard;

const styles = StyleSheet.create({
  card: {
    width: 120,
    marginRight: Spacing.lg,
  },

  imageBox: {
    height: 130,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: Spacing.sm,
    backgroundColor: YELLOW_BG,
  },

  image: {
    width: '80%',
    height: '80%',
  },

  saveBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.xs,
  },

  saveText: {
    color: Colors.white,
    fontSize: 10.5,
    fontWeight: '700',
  },

  addBtn: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: Colors.white,
    borderWidth: 1.8,
    borderColor: Colors.success,
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 6,
  },

  addText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.success,
  },

  stepper: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderWidth: 1.8,
    borderColor: Colors.success,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stepBtn: {
    width: 25,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepTxt: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.success,
    lineHeight: 22,
  },

  qtyTxt: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.success,
    minWidth: 24,
    textAlign: 'center',
  },

  labelRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
  },

  label: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.xs,
    borderWidth: 0.5,
    borderColor: Colors.gray300,
  },

  labelTxt: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray800,
  },

  title: {
    marginTop: Spacing.sm,
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.gray900,
    lineHeight: 17,
  },

  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },

  rating: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.success,
  },

  time: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.gray700,
  },

  stock: {
    marginTop: Spacing.sm,
    fontSize: 11,
    fontWeight: '700',
    color: Colors.warning,
  },

  priceRowBg: {
    marginTop: Spacing.sm,
    backgroundColor: YELLOW_BG,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.xs,
    borderRadius: Radius.sm,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  price: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.gray900,
  },

  mrp: {
    fontSize: 11.5,
    color: Colors.gray600,
    textDecorationLine: 'line-through',
  },

  unitPrice: {
    marginTop: Spacing.xxs,
    fontSize: 10.5,
    color: Colors.gray700,
  },
});

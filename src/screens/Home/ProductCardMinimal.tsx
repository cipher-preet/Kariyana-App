import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Radius, Typography } from '../../styles';

import type { Product } from '../../types';

import {
  addItemOptimistic,
  removeItemOptimistic,
} from '../../ReduxToolKit/Slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { triggerCartSync } from '../../ReduxToolKit/Slices/cartSync';

type Props = {
  item: Product;
  onAdd?: (id: string, qty: number) => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2) / 3;

const ProductCardMinimal: React.FC<Props> = ({ item, onAdd }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const cartItem = useSelector((state: any) => state.cart.items[item._id]);

  const qty = cartItem?.quantity ?? 0;

  const isOutOfStock = item.sku === 0;

  const handleNavigate = () => {
    navigation.navigate('ProductDetailsNavigator', {
      product: item,
    });
  };

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
  };

  const decrease = () => {
    dispatch(removeItemOptimistic(item._id));
    triggerCartSync();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.card, isOutOfStock && styles.outOfStockCard]}
      onPress={!isOutOfStock ? handleNavigate : undefined}
    >
      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <View style={styles.imageBox}>
          <Image
            source={{ uri: item.images }}
            style={styles.image}
            resizeMode="contain"
          />

          {isOutOfStock ? (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>OUT OF STOCK</Text>
            </View>
          ) : qty === 0 ? (
            <TouchableOpacity
              style={styles.addInside}
              onPress={increase}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.addTxt}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.stepperInside}>
              <TouchableOpacity
                onPress={decrease}
                style={styles.stepBtnInside}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.stepSign}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyInside}>{qty}</Text>

              <TouchableOpacity
                onPress={increase}
                style={styles.stepBtnInside}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.stepSign}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* QUANTITY */}
        {item.quantityPerUnit && (
          <Text style={styles.quantity}>
            {item.quantityPerUnit} {item.unit}
          </Text>
        )}

        {/* TITLE */}
        <Text style={styles.title} numberOfLines={3}>
          {item.name}
        </Text>

        {/* RATING */}
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>⭐</Text>
          <Text style={styles.ratingCount}>
            {item.rating} ({item.reviewCount})
          </Text>
        </View>

        {/* TIME */}
        <Text style={styles.time}>24-48 hrs</Text>

        {/* PRICE */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{item.mrp}</Text>
            <View style={styles.mrpRow}>
              <Text style={styles.mrp}>Market Price</Text>
              <Text style={styles.discount}>{item.marketPrice}</Text>
            </View>
            <View style={styles.mrpRow}>
              <Text style={styles.mrp}>Selling Price</Text>
              <Text style={styles.discount}>{item.sellingPrice}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardMinimal;

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.md,
    padding: 0,
    marginBottom: Spacing.xl,
  },

  stepSign: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.success,
    lineHeight: 22,
  },

  outOfStockCard: {
    opacity: 0.45,
  },

  outOfStockBadge: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: 50 }],
    backgroundColor: Colors.gray900,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },

  outOfStockText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.white,
  },

  imageBox: {
    width: '100%',
    height: 130,
    backgroundColor: Colors.gray50,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  addInside: {
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

  addTxt: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.success,
  },

  stepperInside: {
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

  stepBtnInside: {
    width: 25,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyInside: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.success,
    minWidth: 24,
    textAlign: 'center',
  },

  quantity: {
    ...Typography.caption,
    marginBottom: Spacing.xxs,
    fontSize: 12,
  },

  title: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray900,
    marginBottom: Spacing.xxs,
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxs,
  },

  ratingStar: {
    fontSize: 12,
    marginRight: 2,
    color: '#f7b600',
  },

  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray900,
  },

  ratingCount: {
    marginLeft: Spacing.xs,
    fontSize: 10,
    color: Colors.gray500,
  },

  time: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: Spacing.sm,
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.gray900,
  },

  mrpRow: {
    marginTop: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },

  mrp: {
    fontSize: 10,
    color: Colors.gray500,
    marginRight: Spacing.xs,
  },

  discount: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
  },
});

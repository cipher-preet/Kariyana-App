import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';
import type { Product } from '../../types';

import { useDispatch, useSelector } from 'react-redux';
import {
  addItemOptimistic,
  removeItemOptimistic,
} from '../../ReduxToolKit/Slices/cartSlice';
import { triggerCartSync } from '../../ReduxToolKit/Slices/cartSync';

const PRICE_GREEN = '#16823A';
const OFFER_GREEN = '#11853D';
const ADD_PINK = '#E91E63';

const getSavings = (item: Product) => {
  const basePrice = item.marketPrice || item.mrp;
  const sellingPrice = item.sellingPrice || item.price;

  if (!basePrice || !sellingPrice || basePrice <= sellingPrice) {
    return null;
  }

  return basePrice - sellingPrice;
};

type Props = {
  item: Product;
  onAdd?: (id: string, qty: number) => void;
};

const SaleCard: React.FC<Props> = ({ item, onAdd }) => {
  const { width } = useWindowDimensions();
  const user_Id = useSelector((state: any) => state.auth.userId);
  const dispatch = useDispatch();

  const cartItem = useSelector((state: any) => state.cart.items[item._id]);
  const qty = cartItem?.quantity ?? 0;
  const savings = getSavings(item);
  const cardWidth = Math.min(150, Math.max(112, width * 0.31));

  const increase = () => {
    dispatch(
      addItemOptimistic({
        product: {
          productId: item._id,
          price: item.mrp,
        },
        userId: user_Id,
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
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={[styles.imageBox, { height: cardWidth * 0.9 }]}>
        {item.marketPrice > item.sellingPrice && (
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>Deal</Text>
          </View>
        )}

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
            <Text style={styles.addText}>+</Text>
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

      <View style={styles.priceRow}>
        <Text style={styles.price}>Rs{item.sellingPrice}</Text>
        <Text style={styles.mrp}>Rs{item.mrp}</Text>
      </View>

      {savings ? <Text style={styles.saving}>Rs{savings} OFF</Text> : null}

      <Text numberOfLines={2} style={styles.title}>
        {item.name}
      </Text>

      {item.quantityPerUnit && (
        <Text style={styles.unitPrice} numberOfLines={1}>
          {item.quantityPerUnit} {item.unit}
        </Text>
      )}
    </View>
  );
};

export default SaleCard;

const styles = StyleSheet.create({
  card: {
    marginRight: Spacing.md,
    padding: 0,
  },

  imageBox: {
    height: 104,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: Spacing.xs,
    backgroundColor: '#F1F2F4',
  },

  image: {
    width: '92%',
    height: '92%',
  },

  saveBadge: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    backgroundColor: '#111A14',
    paddingHorizontal: 7,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.full,
    zIndex: 1,
  },

  saveText: {
    color: Colors.white,
    fontSize: 9.5,
    fontWeight: '600',
  },

  addBtn: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: Colors.white,
    borderWidth: 1.4,
    borderColor: ADD_PINK,
    width: 36,
    height: 36,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addText: {
    fontSize: 24,
    fontWeight: '700',
    color: ADD_PINK,
    lineHeight: 25,
  },

  stepper: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
    backgroundColor: ADD_PINK,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stepBtn: {
    width: 22,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 22,
  },

  qtyTxt: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
    minWidth: 24,
    textAlign: 'center',
  },

  title: {
    marginTop: 4,
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.gray900,
    lineHeight: 15,
    minHeight: 30,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: 3,
  },

  price: {
    overflow: 'hidden',
    backgroundColor: PRICE_GREEN,
    borderRadius: Radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.white,
  },

  mrp: {
    fontSize: 11,
    color: Colors.gray500,
    textDecorationLine: 'line-through',
  },

  saving: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '700',
    color: OFFER_GREEN,
  },

  unitPrice: {
    marginTop: Spacing.xxs,
    fontSize: 10,
    color: Colors.gray700,
    fontWeight: '700',
  },
});

import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Radius } from '../../styles';

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
  cardWidth?: number;
};

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

const ProductCardMinimal: React.FC<Props> = ({ item, cardWidth }) => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const cartItem = useSelector((state: any) => state.cart.items[item._id]);

  const user_Id = useSelector((state: any) => state.auth.userId);

  const qty = cartItem?.quantity ?? 0;

  const isOutOfStock = item.sku === 0;
  const savings = getSavings(item);

  const handleNavigate = () => {
    navigation.navigate('categories', {
      screen: 'ProductDetailsNavigator',
      params: {
        product: item,
      },
    });
  };

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
  };

  const decrease = () => {
    dispatch(removeItemOptimistic(item._id));
    triggerCartSync();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.card,
        cardWidth ? { width: cardWidth } : null,
        isOutOfStock && styles.outOfStockCard,
      ]}
      onPress={!isOutOfStock ? handleNavigate : undefined}
    >
      <View
        style={[
          styles.imageBox,
          cardWidth ? { height: Math.max(88, cardWidth * 0.92) } : null,
        ]}
      >
        <Image
          source={{ uri: item.images }}
          style={styles.image}
          resizeMode="contain"
        />

        {isOutOfStock ? (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>OUT</Text>
          </View>
        ) : qty === 0 ? (
          <TouchableOpacity
            style={styles.addInside}
            onPress={increase}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.addTxt}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.stepperInside}>
            <TouchableOpacity
              onPress={decrease}
              style={styles.stepBtnInside}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.stepSign}>-</Text>
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

      <View style={styles.priceBlock}>
        <Text style={styles.price}>Rs{item.sellingPrice}</Text>
        <Text style={styles.mrp}>Rs{item.mrp}</Text>
      </View>

      {savings ? <Text style={styles.saving}>Rs{savings} OFF</Text> : null}

      <Text style={styles.title} numberOfLines={2}>
        {item.name}
      </Text>

      {item.quantityPerUnit && (
        <Text style={styles.quantity} numberOfLines={1}>
          {item.quantityPerUnit} {item.unit}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ProductCardMinimal;

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
    flexShrink: 0,
  },

  stepSign: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 22,
  },

  outOfStockCard: {
    opacity: 0.58,
  },

  outOfStockBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: Colors.gray900,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.sm,
  },

  outOfStockText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.white,
  },

  imageBox: {
    width: '100%',
    height: 102,
    backgroundColor: '#F1F2F4',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 7,
    position: 'relative',
  },

  image: {
    width: '92%',
    height: '92%',
  },

  addInside: {
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

  addTxt: {
    fontSize: 24,
    fontWeight: '700',
    color: ADD_PINK,
    lineHeight: 25,
  },

  stepperInside: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    flexDirection: 'row',
    backgroundColor: ADD_PINK,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stepBtnInside: {
    width: 22,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyInside: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.white,
    minWidth: 22,
    textAlign: 'center',
  },

  quantity: {
    marginTop: 3,
    fontSize: 11,
    color: Colors.gray600,
    fontWeight: '500',
  },

  title: {
    marginTop: 4,
    fontSize: 12.3,
    fontWeight: '700',
    color: '#202124',
    lineHeight: 16,
    minHeight: 32,
  },

  priceBlock: {
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
});

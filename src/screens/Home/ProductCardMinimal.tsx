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

type Props = {
  item: Product;
  onAdd?: (id: string, qty: number) => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = (SCREEN_WIDTH - Spacing.lg * 2 - Spacing.md * 2) / 3; // SAME math

const ProductCardMinimal: React.FC<Props> = ({ item, onAdd }) => {
  const navigation = useNavigation<any>();

  const [qty, setQty] = useState(0);

  const handleNavigate = () => {
    navigation.navigate('ProductDetails', {
      product: item,
    });
  };

  const increase = () => {
    const n = qty + 1;
    setQty(n);
    onAdd?.(item.id, n);
  };

  const decrease = () => {
    if (qty <= 1) {
      setQty(0);
      onAdd?.(item.id, 0);
      return;
    }
    const n = qty - 1;
    setQty(n);
    onAdd?.(item.id, n);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.card}
      onPress={handleNavigate}
    >
      <View style={[styles.card, { width: CARD_WIDTH }]}>
        <View style={styles.imageBox}>
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />

          {qty === 0 ? (
            <TouchableOpacity style={styles.addInside} onPress={increase}>
              <Text style={styles.addTxt}>ADD</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.stepperInside}>
              <TouchableOpacity onPress={decrease} style={styles.stepBtnInside}>
                <Text style={styles.stepSign}>−</Text>
              </TouchableOpacity>

              <Text style={styles.qtyInside}>{qty}</Text>

              <TouchableOpacity onPress={increase} style={styles.stepBtnInside}>
                <Text style={styles.stepSign}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* QUANTITY */}
        {item.quantity && <Text style={styles.quantity}>{item.quantity}</Text>}

        {/* TITLE */}
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>

        {/* RATING */}
        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>⭐</Text>
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.ratingCount}>({item.rating})</Text>
        </View>

        {/* TIME */}
        <Text style={styles.time}>{item.time}</Text>

        {/* PRICE */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>₹{item.price}</Text>
            <View style={styles.mrpRow}>
              <Text style={styles.mrp}>₹{item.mrp}</Text>
              <Text style={styles.discount}>{item.discount}% OFF</Text>
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
    fontSize: 14,
    fontWeight: '900',
    color: Colors.success,
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
    width: '80%',
    height: '80%',
  },

  addInside: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.success,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.sm,
  },

  addTxt: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.success,
  },

  stepperInside: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.success,
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    elevation: 3,
    minWidth: 80,
    justifyContent: 'space-between',
  },

  stepBtnInside: {
    paddingHorizontal: Spacing.xs,
    width: 18,
    height: 18,
  },

  qtyInside: {
    marginHorizontal: Spacing.xs,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray900,
  },

  quantity: {
    ...Typography.caption,
    marginBottom: Spacing.xxs,
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
    flexDirection: 'row',
    alignItems: 'center',
  },

  mrp: {
    fontSize: 10,
    textDecorationLine: 'line-through',
    color: Colors.gray500,
    marginRight: Spacing.xs,
  },

  discount: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.success,
  },
});

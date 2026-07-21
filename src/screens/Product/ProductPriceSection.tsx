import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../../styles';

type PriceProps = {
  mrp: number;
  marketPrice: number;
  sellingPrice: number;
  rating?: number;
  reviewCount?: number;
};

const ProductPriceSection: React.FC<PriceProps> = ({
  mrp,
  marketPrice,
  sellingPrice,
  rating,
  reviewCount,
}) => {
  const finalPrice = sellingPrice || mrp;
  const savings =
    marketPrice && finalPrice && marketPrice > finalPrice
      ? marketPrice - finalPrice
      : null;

  return (
    <View style={styles.container}>
      <View style={styles.priceRow}>
        <Text style={styles.price}>Rs{finalPrice}</Text>
        {mrp && mrp > finalPrice ? <Text style={styles.mrp}>Rs{mrp}</Text> : null}
        {savings ? (
          <View style={styles.saveBadge}>
            <Text style={styles.saveText}>Rs{savings} OFF</Text>
          </View>
        ) : null}
      </View>

      {rating !== undefined && reviewCount !== undefined && (
        <View style={styles.ratingRow}>
          <Text style={styles.ratingBadge}>{rating.toFixed(1)}</Text>
          <Text style={styles.reviewText}>({reviewCount} reviews)</Text>
        </View>
      )}

      <Text style={styles.tax}>Inclusive of all taxes</Text>

      <View style={styles.priceContainer}>
        <View style={styles.mrpRow}>
          <Text style={styles.mrpLabel}>Market Price</Text>
          <Text style={styles.priceValue}>Rs{marketPrice}</Text>
        </View>

        <View style={styles.mrpRow}>
          <Text style={styles.mrpLabel}>Selling Price</Text>
          <Text style={styles.priceValue}>Rs{sellingPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductPriceSection;

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.md,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  price: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gray900,
  },

  mrp: {
    fontSize: 13,
    color: Colors.gray500,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },

  saveBadge: {
    backgroundColor: '#E9F8EE',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },

  saveText: {
    color: '#11853D',
    fontSize: 11,
    fontWeight: '600',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },

  ratingBadge: {
    backgroundColor: '#0F8A43',
    borderRadius: Radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: Colors.white,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    marginRight: 4,
  },

  reviewText: {
    marginLeft: 6,
    fontSize: 11,
    color: Colors.gray600,
  },

  tax: {
    marginTop: Spacing.xs,
    fontSize: 11.5,
    color: Colors.gray600,
  },

  priceContainer: {
    marginTop: Spacing.md,
    backgroundColor: Colors.gray50,
    borderRadius: Radius.md,
    padding: Spacing.sm,
  },

  mrpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingVertical: 3,
  },

  mrpLabel: {
    fontSize: 11,
    color: Colors.gray600,
  },

  priceValue: {
    fontSize: 11.5,
    fontWeight: '600',
    color: Colors.gray900,
  },
});

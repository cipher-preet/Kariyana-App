import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../styles';

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
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.price}>₹{mrp}</Text>
      </View>

      {rating !== undefined && reviewCount !== undefined && (
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Text style={styles.reviewText}>({reviewCount} reviews)</Text>
        </View>
      )}

      <Text style={styles.tax}>Inclusive of all taxes</Text>

      <View style={styles.priceContainer}>
        <View style={styles.mrpRow}>
          <Text style={styles.mrpLabel}>Market Price</Text>
          <Text style={styles.priceValue}>₹{marketPrice}</Text>
        </View>

        <View style={styles.mrpRow}>
          <Text style={styles.mrpLabel}>Selling Price</Text>
          <Text style={styles.priceValue}>₹{sellingPrice}</Text>
        </View>
      </View>
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

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },

  star: {
    fontSize: 12,
    marginRight: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray900,
  },

  reviewText: {
    marginLeft: 6,
    fontSize: 11,
    color: Colors.gray600,
  },

  tax: {
    marginTop: 4,
    fontSize: 11.5,
    color: '#757575',
  },

  priceContainer: {
    marginTop: 10,
    paddingBottom: 4,
  },

  mrpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },

  mrpLabel: {
    fontSize: 11,
    color: Colors.gray600,
  },

  priceValue: {
    fontSize: 11.5,
    fontWeight: '700',
    color: Colors.gray900,
  },
});

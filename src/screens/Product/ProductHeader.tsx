import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../styles';

type ProductHeaderProps = {
  quantityPerUnit?: number;
  unit?: string;
  name: string;
  sku: number | 0;
};

const ProductHeader: React.FC<ProductHeaderProps> = ({
  quantityPerUnit,
  unit,
  name,
  sku,
}) => {
  return (
    <View>
      <View style={styles.chipRow}>
        {quantityPerUnit ? (
          <View style={styles.quantityChip}>
            <Text style={styles.quantity}>
              {quantityPerUnit} {unit}
            </Text>
          </View>
        ) : null}

        {sku < 10 && sku > 0 ? (
          <View style={styles.stockChip}>
            <Text style={styles.stock}>Only {sku} left</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.title}>{name}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.delivery}>Delivery 14-48 hrs</Text>
        {sku === 0 ? <Text style={styles.out}>Out of stock</Text> : null}
      </View>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  quantityChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECF7EF',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.gray900,
    lineHeight: 25,
  },

  quantity: {
    ...Typography.caption,
    fontSize: 12,
    color: '#0B6B3A',
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 8,
  },

  stockChip: {
    backgroundColor: '#FFF2F0',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },

  stock: {
    fontSize: 11,
    color: Colors.error,
    fontWeight: '600',
  },

  delivery: {
    fontSize: 12,
    color: '#0B6B3A',
    fontWeight: '600',
  },

  out: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '600',
  },
});

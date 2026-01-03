import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../styles';

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
      <Text style={styles.quantity}>
        {quantityPerUnit} {unit}
      </Text>

      <Text style={styles.title}>{name}</Text>

      <View style={styles.metaRow}>
        {sku < 10 && <Text style={styles.stock}>Only {sku} left</Text>}
      </View>
      <Text style={styles.delivery}>Delivery 14-48 hrs</Text>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f1f1f',
  },

  quantity: {
    ...Typography.caption,
    marginBottom: Spacing.xs,
    fontSize: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  stock: {
    fontSize: 12.5,
    color: '#d32f2f',
    fontWeight: '600',
  },

  delivery: {
    fontSize: 12.5,
    color: '#4caf50',
    fontWeight: '600',
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#bdbdbd',
    marginHorizontal: 6,
  },
});

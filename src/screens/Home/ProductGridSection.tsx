import React from 'react';
import { View, Text, FlatList, StyleSheet, useWindowDimensions } from 'react-native';

import { Colors, Spacing } from '../../styles';

import ProductCardMinimal from './ProductCardMinimal';
import type { Product } from '../../types';

type Props = {
  title: string;
  data: Product[];
  onAdd?: (id: string, qty: number) => void;
  bg?: string;
};

const ProductGridSection: React.FC<Props> = ({ title, data, bg }) => {
  const { width } = useWindowDimensions();
  const columns = width >= 900 ? 6 : width >= 700 ? 5 : width >= 520 ? 4 : 3;
  const contentWidth = width - Spacing.md * 2;
  const cardWidth =
    (contentWidth - Spacing.xs * (columns - 1)) / columns;

  return (
    <View style={[styles.wrap, bg && { backgroundColor: bg }]}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={it => it._id}
        key={columns}
        numColumns={columns}
        columnWrapperStyle={styles.columnWrap}
        renderItem={({ item }) => (
          <ProductCardMinimal item={item} cardWidth={cardWidth} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductGridSection;

const styles = StyleSheet.create({
  wrap: {
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },

  headerRow: {
    marginBottom: Spacing.sm,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray900,
  },

  columnWrap: {
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
});

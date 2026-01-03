import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { Colors, Spacing } from '../../styles';

import ProductCardMinimal from './ProductCardMinimal';
import type { Product } from '../../types';

type Props = {
  title: string;
  data: Product[];
  onAdd?: (id: string, qty: number) => void;
  bg?: string;
};

const ProductGridSection: React.FC<Props> = ({ title, data, onAdd, bg }) => {
  return (
    <View style={[styles.wrap, bg && { backgroundColor: bg }]}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={it => it._id}
          numColumns={3}
          columnWrapperStyle={styles.columnWrap}
          renderItem={({ item }) => (
            <ProductCardMinimal item={item} onAdd={onAdd} />
          )}
          showsVerticalScrollIndicator={false}
        />
    </View>
  );
};

export default ProductGridSection;

const styles = StyleSheet.create({
  wrap: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: Spacing.md,
    color: Colors.gray900,
  },

  columnWrap: {
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
});

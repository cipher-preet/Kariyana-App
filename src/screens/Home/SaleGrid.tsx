import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { Colors, Spacing } from '../../styles';

import SaleCard from './SaleCard';
import type { Product } from '../../types';

type Props = {
  title: string;
  data: Product[];
  onAdd?: (id: string, qty: number) => void;
};

const SaleGrid: React.FC<Props> = ({ title, data, onAdd }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.headerWrap}>
        <Text style={styles.kicker}>Trending now</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <FlatList
        data={data}
        horizontal
        keyExtractor={it => it._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <SaleCard item={item} onAdd={onAdd} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default SaleGrid;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    marginTop: Spacing.sm,
    backgroundColor: 'transparent',
  },

  headerWrap: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxs,
  },

  kicker: {
    color: Colors.secondaryDark,
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: Spacing.xxs,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.gray900,
  },

  listContent: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    paddingTop: Spacing.sm,
  },
});

// src/components/SaleGrid.tsx
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
  Shadows,
} from '../../styles';

import SaleCard from './SaleCard';
import type { Product } from '../../types';

type Props = {
  data: Product[];
  onAdd?: (id: string, qty: number) => void;
};

const SaleGrid: React.FC<Props> = ({ data, onAdd }) => {
  return (
    <View style={styles.wrap}>
      {/* HEADER */}
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>LOWEST PRICES EVER</Text>
      </View>

      {/* PRODUCT LIST */}
      <FlatList
        data={data}
        horizontal
        keyExtractor={(it) => it._id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <SaleCard item={item} onAdd={onAdd} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default SaleGrid;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    borderRadius: Radius.lg,          
    marginTop: Spacing.md,              
    backgroundColor: '#FFF7E0',          
    ...Shadows.soft,
  },

  headerWrap: {
    paddingTop: Spacing.md,            
    paddingBottom: Spacing.xxs,         
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 20,                      
    fontWeight: '900',                 
    color: Colors.gray900,
    letterSpacing: 0.3,
  },

  listContent: {
    paddingHorizontal: Spacing.lg,      
    paddingBottom: Spacing.xxl,         
    paddingTop: Spacing.md,             
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WrapperContainer from '../../components/common/WrapperContainer/WrapperContainer';
import CategoryGrid from './CategoryGrid';

import { Colors, Spacing } from '../../styles';
import { useGetCategoriesQuery } from '../../ReduxToolKit/Api';
import { ApiResponse } from '../../types/categoryType';
import CategorySkeleton from './CategorySkeleton';

const CategoriesScreen = () => {
  const { data, isLoading, error } = useGetCategoriesQuery<ApiResponse>();

  if (error) {
    return (
      <WrapperContainer
        title="Categories"
        subtitle=""
        showHeaderCopy
        showDeliveryBadge={false}
        showBackButton
      >
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Unable to load categories</Text>
        </View>
      </WrapperContainer>
    );
  }

  const categories = data?.data ? Object.entries(data.data) : [];

  return (
    <WrapperContainer
      title="Categories"
      subtitle=""
      showHeaderCopy
      showDeliveryBadge={false}
      showBackButton
    >
      <View style={styles.content}>
        {isLoading || !data
          ? Array.from({ length: 3 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          : categories.map(([categoryName, items]) => (
              <View key={categoryName} style={styles.section}>
                <Text style={styles.sectionTitle}>{categoryName}</Text>
                <CategoryGrid data={items} />
              </View>
            ))}
      </View>
    </WrapperContainer>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingBottom: Spacing.xxl,
  },

  section: {
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    color: '#202124',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },

  emptyState: {
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '600',
  },
});

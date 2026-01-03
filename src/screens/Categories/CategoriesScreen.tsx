import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import WrapperContainer from '../../components/common/WrapperContainer/WrapperContainer';
import CategoryGrid from './CategoryGrid';

import { Colors, Spacing, Typography } from '../../styles';
import { useGetCategoriesQuery } from '../../ReduxToolKit/Api';
import { ApiResponse } from '../../types/categoryType';
import CategorySkeleton from './CategorySkeleton';


const CategoriesScreen = () => {

  const { data, isLoading, error } = useGetCategoriesQuery<ApiResponse>();

  console.log('Categories Screen Data: ', data);

  if (error || !data) {
    return <Text>Something went wrong</Text>;   // need to be chnage like (adjust hr ui)
  }

  const categories = Object.entries(data?.data);

  return (
    <WrapperContainer title="Categories">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))
          : categories.map(([categoryName, items]) => (
              <View key={categoryName}>
                <Text style={styles.sectionTitle}>{categoryName}</Text>
                <CategoryGrid data={items} />
              </View>
            ))}
      </ScrollView>
    </WrapperContainer>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    paddingBottom: Spacing.xxxl,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.gray900,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.lg,
  },
});

import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
} from 'react-native';
import WrapperContainer from '../../components/common/WrapperContainer/WrapperContainer';
import { Colors, Spacing } from '../../styles';
import ProductCardMinimal from '../Home/ProductCardMinimal';
import {
  useLazyGetProductByCatagoryQuery,
  useLazyGetProductsbyParentcategoryidQuery,
} from '../../ReduxToolKit/Api/productApi';

const ProductByCategory = ({ route }: any) => {
  const { categoryId, categoryName, type } = route.params;
  const { width } = useWindowDimensions();

  const [products, setProducts] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const isLoadingMore = useRef(false);

  const [getChildProducts, { isLoading }] = useLazyGetProductByCatagoryQuery();
  const [getParentProducts] = useLazyGetProductsbyParentcategoryidQuery();
  const columns = width >= 900 ? 6 : width >= 700 ? 5 : width >= 520 ? 4 : 3;
  const contentWidth = width - Spacing.md * 2;
  const cardWidth =
    (contentWidth - Spacing.xs * (columns - 1)) / columns;

  const loadInitialProducts = useCallback(async () => {
    try {
      setIsInitialLoading(true);

      let response;

      if (type === 'Parentcategory') {
        response = await getParentProducts({
          childCatId: categoryId,
          cursor: undefined,
        }).unwrap();
      } else {
        response = await getChildProducts({
          childCatId: categoryId,
          cursor: undefined,
        }).unwrap();
      }

      if (response?.data?.products) {
        setProducts(response.data.products);
        setNextCursor(response.data.nextCursor);
        setHasMore(response.data.hasNextPage);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsInitialLoading(false);
    }
  }, [categoryId, getChildProducts, getParentProducts, type]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  const loadMoreProducts = async () => {
    if (isLoadingMore.current || isLoading || !hasMore || !nextCursor) {
      return;
    }

    try {
      isLoadingMore.current = true;

      let response;

      if (type === 'Parentcategory') {
        response = await getParentProducts({
          childCatId: categoryId,
          cursor: nextCursor,
        }).unwrap();
      } else {
        response = await getChildProducts({
          childCatId: categoryId,
          cursor: nextCursor,
        }).unwrap();
      }

      if (response?.data?.products) {
        setProducts(prev => [...prev, ...response.data.products]);
        setNextCursor(response.data.nextCursor);
        setHasMore(response.data.hasNextPage);
      }
    } catch (error) {
      console.error('Error loading more:', error);
    } finally {
      isLoadingMore.current = false;
    }
  };

  const handleEndReached = () => {
    loadMoreProducts();
  };

  if (isInitialLoading) {
    return (
      <WrapperContainer
        title={categoryName || 'Products'}
        subtitle="Loading products"
        scrollable={false}
        showBackButton
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </WrapperContainer>
    );
  }

  return (
    <WrapperContainer
      title={categoryName || 'Products'}
      subtitle={`${products.length} items`}
      scrollable={false}
      showBackButton
    >
      <View style={styles.wrap}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          key={columns}
          numColumns={columns}
          columnWrapperStyle={styles.columnWrap}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ProductCardMinimal item={item} cardWidth={cardWidth} />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <View style={styles.footer}>
              {isLoading || isLoadingMore.current ? (
                <>
                  <ActivityIndicator size="small" color={Colors.primary} />
                  <Text style={styles.loadingText}>Loading more</Text>
                </>
              ) : null}
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={Platform.OS === 'android'}
          maxToRenderPerBatch={9}
          initialNumToRender={9}
          windowSize={5}
        />
      </View>
    </WrapperContainer>
  );
};

export default ProductByCategory;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },

  listContent: {
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xxl,
  },

  columnWrap: {
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footer: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    minHeight: 80,
  },

  loadingText: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 11,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
  },

  emptyText: {
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '600',
  },
});

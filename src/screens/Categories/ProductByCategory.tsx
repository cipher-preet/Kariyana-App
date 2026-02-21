import React, { useEffect, useState, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Platform,
} from 'react-native';
import WrapperContainer from '../../components/common/WrapperContainer/WrapperContainer';
import { Colors, Spacing } from '../../styles';
import ProductCardMinimal from '../Home/ProductCardMinimal';
import { useLazyGetProductByCatagoryQuery } from '../../ReduxToolKit/Api/productApi';

const ProductByCategory = ({ route }: any) => {
  const { categoryId, categoryName } = route.params;

  const [products, setProducts] = useState<any[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const isLoadingMore = useRef(false);

  const [getProducts, { isLoading }] = useLazyGetProductByCatagoryQuery();

  useEffect(() => {
    loadInitialProducts();
  }, []);

  const loadInitialProducts = async () => {
    try {
      setIsInitialLoading(true);
      const response = await getProducts({
        childCatId: categoryId,
        cursor: undefined,
      }).unwrap();

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
  };

  const loadMoreProducts = async () => {
    if (isLoadingMore.current || isLoading || !hasMore || !nextCursor) {
      return;
    }

    try {
      isLoadingMore.current = true;
      const response = await getProducts({
        childCatId: categoryId,
        cursor: nextCursor,
      }).unwrap();

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
      <WrapperContainer scrollable={false}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </WrapperContainer>
    );
  }

  console.log('this is product in cat section --->> ', products);

  return (
    <WrapperContainer scrollable={false}>
      <View style={styles.wrap}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          numColumns={3}
          columnWrapperStyle={styles.columnWrap}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <ProductCardMinimal item={item} />
            </View>
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            <View style={styles.footer}>
              {isLoading || isLoadingMore.current ? (
                <>
                  <ActivityIndicator size="small" color={Colors.primary} />
                  <Text style={styles.loadingText}>Loading more...</Text>
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: Spacing.md,
    color: Colors.gray900,
  },

  listContent: {
    paddingBottom: Spacing.xl,
  },

  columnWrap: {
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },

  itemWrapper: {
    width: '32%',
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
    fontSize: 12,
  },

  endText: {
    color: Colors.gray600,
    fontSize: 14,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.xl * 2,
  },

  emptyText: {
    color: Colors.gray600,
    fontSize: 16,
  },
});

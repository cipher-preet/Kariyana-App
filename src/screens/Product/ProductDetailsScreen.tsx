import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProductImageSection from './ProductImageSection';
import ProductHeader from './ProductHeader';
import ProductPriceSection from './ProductPriceSection';
import ProductMetaIcons from './ProductMetaIcons';
import ProductHighlights from './ProductHighlights';
import StickyAddToCart from './StickyAddToCart';
import ProductGridSection from '../Home/ProductGridSection';
import { Product } from '../../types';
import { Colors, Radius, Spacing } from '../../styles';

import { RouteProp, useRoute } from '@react-navigation/native';
import {
  useGetProductByCatagoryQuery,
  useGetProductImagesAndHighlightsQuery,
  useLazyGetRandomProductsForCartPageQuery,
} from '../../ReduxToolKit/Api/productApi';
import { skipToken } from '@reduxjs/toolkit/query';

type RouteParams = {
  product: Product;
};

const ProductDetailsScreen = () => {
  const route =
    useRoute<
      RouteProp<
        { ProductDetails: RouteParams },
        'ProductDetails'
      >
    >();

  const { product } = route.params;
  const {
    marketPrice,
    mrp,
    name,
    quantityPerUnit,
    rating,
    reviewCount,
    unit,
    sellingPrice,
    sku,
  } = product;

  const productId = product._id;
  const relatedCategoryId =
    product.subcategoryId ||
    product.childCategoryId ||
    product.childCatId ||
    product.categoryId;

  const { data, isLoading } = useGetProductByCatagoryQuery(
    relatedCategoryId ? { childCatId: relatedCategoryId } : skipToken,
  );
  const [
    getRandomProducts,
    { data: randomProductsData, isFetching: isRandomProductsFetching },
  ] = useLazyGetRandomProductsForCartPageQuery();

  const {
    data: productImagesData,
    isLoading: isProductImagesLoading,
  } = useGetProductImagesAndHighlightsQuery({ productId });

  useEffect(() => {
    getRandomProducts();
  }, [getRandomProducts]);

  if (isLoading && isProductImagesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor={DETAIL_COLORS.hero} />
        <ActivityIndicator size="large" color={DETAIL_COLORS.hero} />
        <Text style={styles.loadingText}>Loading product</Text>
      </View>
    );
  }

  const similarProducts = (data?.data?.products ?? []).filter(
    (item: Product) => item._id !== productId,
  );
  const fallbackProducts = (randomProductsData?.data?.products ?? []).filter(
    (item: Product) => item._id !== productId,
  );
  const productGridData =
    similarProducts.length > 0 ? similarProducts : fallbackProducts;
  const productGridTitle =
    similarProducts.length > 0 ? 'Similar Products' : 'More Products';
  const apiImages = productImagesData?.data?.data?.url;
  const imageSource = Array.isArray(apiImages) ? apiImages : [apiImages];
  const images = imageSource
    .map((item: any) => {
      if (typeof item === 'string') return item;
      return item?.url || item?.image || item?.uri;
    })
    .filter(Boolean);

  if (images.length === 0 && product.images) {
    images.push(product.images);
  }
  const highlights = productImagesData?.data?.data?.heighlights || [];

  return (
    <View style={styles.container}>
      <ScrollView
        key={productId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductImageSection images={images} />

        <View style={styles.productCard}>
          <ProductHeader
            quantityPerUnit={quantityPerUnit}
            unit={unit}
            name={name}
            sku={sku}
          />
          <ProductPriceSection
            mrp={mrp}
            marketPrice={marketPrice}
            sellingPrice={sellingPrice}
            rating={rating}
            reviewCount={reviewCount}
          />
        </View>

        <View style={styles.sectionCard}>
          <ProductMetaIcons />
        </View>

        <View style={styles.sectionCard}>
          <ProductHighlights highlights={highlights} />
        </View>

        <View style={styles.productsSection}>
          {isLoading || isRandomProductsFetching ? (
            <View style={styles.gridLoading}>
              <ActivityIndicator size="small" color={DETAIL_COLORS.hero} />
              <Text style={styles.gridLoadingText}>Loading products</Text>
            </View>
          ) : productGridData.length > 0 ? (
            <ProductGridSection
              title={productGridTitle}
              data={productGridData}
              onAdd={(id, qty) => console.log(id, qty)}
            />
          ) : (
            <View style={styles.emptyGrid}>
              <Text style={styles.emptyGridTitle}>More Products</Text>
              <Text style={styles.emptyGridText}>No products available right now</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <StickyAddToCart product={product} />
    </View>
  );
};

export default ProductDetailsScreen;

const DETAIL_COLORS = {
  page: '#F4F5F7',
  hero: '#0B6B3A',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DETAIL_COLORS.page,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: DETAIL_COLORS.page,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 96,
  },
  productCard: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  sectionCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
  productsSection: {
    backgroundColor: Colors.white,
    marginTop: Spacing.sm,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  gridLoading: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  gridLoadingText: {
    marginTop: Spacing.sm,
    fontSize: 11,
    color: Colors.gray600,
    fontWeight: '500',
  },
  emptyGrid: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.lg,
  },
  emptyGridTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray900,
  },
  emptyGridText: {
    marginTop: Spacing.xs,
    fontSize: 12,
    color: Colors.gray600,
    fontWeight: '500',
  },
});

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import ProductImageSection from './ProductImageSection';
import ProductHeader from './ProductHeader';
import ProductPriceSection from './ProductPriceSection';
import ProductMetaIcons from './ProductMetaIcons';
import ProductHighlights from './ProductHighlights';
import StickyAddToCart from './StickyAddToCart';
import ProductGridSection from '../Home/ProductGridSection';
import { Product } from '../../types';
import { Colors } from '../../styles';

import { RouteProp, useRoute } from '@react-navigation/native';
import {
  useGetProductByCatagoryQuery,
  useGetProductImagesAndHighlightsQuery,
} from '../../ReduxToolKit/Api/productApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { Text } from 'react-native-svg';

type RouteParams = {
  product: Product;
};

const ProductDetailsScreen = () => {
  const route =
    useRoute<
      RouteProp<
        { ProductDetailsNavigator: RouteParams },
        'ProductDetailsNavigator'
      >
    >();

  const { product } = route.params;
  const {
    _id,
    marketPrice,
    subcategoryId,
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

  const { data, isLoading } = useGetProductByCatagoryQuery(
    subcategoryId ? { childCatId: subcategoryId } : skipToken,
  );

  const {
    data: productImagesData,
    isLoading: isProductImagesLoading,
    error,
  } = useGetProductImagesAndHighlightsQuery({ productId });

  if (isLoading && isProductImagesLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const similarProducts = data?.data?.products ?? [];
  const images = productImagesData?.data?.data?.url || [];
  const highlights = productImagesData?.data?.data?.heighlights || [];

  return (
    <View style={styles.container}>
      <ScrollView
        key={productId}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductImageSection images={images} />

        <View style={styles.card}>
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

        <View style={styles.card}>
          <ProductMetaIcons />
        </View>

        <View style={styles.card}>
          <ProductHighlights highlights={highlights} />
        </View>

        <ProductGridSection
          title="Similar Products"
          data={similarProducts}
          onAdd={(_id, qty) => console.log(_id, qty)}
          bg={Colors.gray50}
        />
      </ScrollView>

    <StickyAddToCart product={product} />    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollContent: {
    paddingBottom: 70,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 6,
    marginTop: 6,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
});

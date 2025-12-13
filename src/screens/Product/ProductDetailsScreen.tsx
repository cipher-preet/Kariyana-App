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

const sampleProducts: Product[] = [
  {
    id: 's1',
    title: 'Helios Stain and Waterproof Sneaker Spray',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '39% OFF',
    rating: '4.3 (24)',
    time: '16 MINS',
    price: 603,
    mrp: 999,
    labels: ['150 ml'],
    unitPrice: '₹402/100 ml',
    stockText: 'Only 1 left',
    discount: 20,
    quantity: '4kg',
  },
  {
    id: 's2',
    title: 'Sneakare RPL Shoe Water-repellent',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '57% OFF',
    rating: '4.5 (75)',
    time: '20 MINS',
    price: 509,
    mrp: 1199,
    labels: ['100 ml'],
    unitPrice: '₹509/100 ml',
    stockText: 'Only 2 left',
    discount: 20,
    quantity: '4kg',
  },
  {
    id: 's3',
    title: 'Sneakare RPL Shoe Water-repellent',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '57% OFF',
    rating: '4.5 (75)',
    time: '20 MINS',
    price: 509,
    mrp: 1199,
    labels: ['100 ml'],
    unitPrice: '₹509/100 ml',
    stockText: 'Only 2 left',
    discount: 20,
    quantity: '4kg',
  },
  {
    id: 's4',
    title: 'Sneakare RPL Shoe Water-repellent',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '57% OFF',
    rating: '4.5 (75)',
    time: '20 MINS',
    price: 509,
    mrp: 1199,
    labels: ['100 ml'],
    unitPrice: '₹509/100 ml',
    stockText: 'Only 2 left',
    discount: 20,
    quantity: '4kg',
  },
  {
    id: 's5',
    title: 'Sneakare RPL Shoe Water-repellent',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '57% OFF',
    rating: '4.5 (75)',
    time: '20 MINS',
    price: 509,
    mrp: 1199,
    labels: ['100 ml'],
    unitPrice: '₹509/100 ml',
    stockText: 'Only 2 left',
    discount: 20,
    quantity: '4kg',
  },
  {
    id: 's6',
    title: 'Sneakare RPL Shoe Water-repellent',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '57% OFF',
    rating: '4.5 (75)',
    time: '20 MINS',
    price: 509,
    mrp: 1199,
    labels: ['100 ml'],
    unitPrice: '₹509/100 ml',
    stockText: 'Only 2 left',
    discount: 20,
    quantity: '4kg',
  },
];

const ProductDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductImageSection />

        <View style={styles.card}>
          <ProductHeader />
          <ProductPriceSection />
        </View>

        <View style={styles.card}>
          <ProductMetaIcons />
        </View>

        <View style={styles.card}>
          <ProductHighlights />
        </View>

         <ProductGridSection
          title="Similar Products"
          data={sampleProducts}
          onAdd={(id, qty) => console.log(id, qty)}
          bg={Colors.gray50}
        />

      </ScrollView>

      <StickyAddToCart />
    </View>
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ProductGridSection from '../Home/ProductGridSection';
import CartCheckoutWrapper from './CartCheckoutWrapper';
import BillDetailsSection from './BillDetailsSection';
import DeliveryInstructionsSection from './DeliveryInstructionsSection';

import { Colors, Spacing, Radius } from '../../styles';

import type { Product } from '../../types';

const cartItems = [
  {
    id: '1',
    title: 'Baskin Robbins Mississippi Mud Ice Cream Tub',
    size: '450 ml',
    price: 378,
    qty: 1,
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
  },
  {
    id: '2',
    title: 'Vaseline Petroleum Jelly',
    size: '40 g',
    price: 285,
    qty: 3,
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
  },
  {
    id: '3',
    title: 'Vaseline Petroleum Jelly',
    size: '40 g',
    price: 285,
    qty: 3,
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
  },
];

const sampleProducts: Product[] = [
  {
    id: 'p1',
    title: 'Lifelong Electric Kettle (1.5 Ltr, 1500W, ISI Certified)',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: 'Save ₹1,200',
    labels: ['1500 W', 'Silver'],
    rating: '4.5 (8,570)',
    time: '12 MINS',
    stockText: 'Only 2 left',
    price: 399,
    mrp: 1599,
    unitPrice: '₹7.45/100 ml',
  },

  {
    id: 'p2',
    title: 'SaveMore Lemon Dishwash Gel',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: 'Save ₹151',
    labels: ['2 L', 'Lemon'],
    rating: '4.4 (4,046)',
    time: '12 MINS',
    stockText: 'Only 3 left',
    price: 149,
    mrp: 300,
    unitPrice: '₹7.45/100 ml',
  },

  {
    id: 'p3',
    title: "HUFt Sara's Wholesome Classic Chicken Food",
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '19% OFF',
    labels: ['3 × 100 g'],
    rating: '4.3 (1,379)',
    time: '12 MINS',
    stockText: 'In stock',
    price: 238,
    mrp: 297,
    unitPrice: '₹79.3/100 g',
  },

  {
    id: 'p4',
    title: 'McCain Garlic Potato Bites',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '40% OFF',
    labels: ['7 Kg'],
    rating: '4.7 (5,210)',
    time: '13 MINS',
    stockText: 'Only 1 left',
    price: 159,
    mrp: 265,
    unitPrice: '₹7.45/100 ml',
  },

  {
    id: 'p5',
    title: 'Organic Brown Rice – Sonamasuri',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '15% OFF',
    labels: ['1 Kg'],
    rating: '4.1 (920)',
    time: '11 MINS',
    stockText: 'In stock',
    price: 109,
    mrp: 129,
    unitPrice: '₹10.9/100 g',
  },
  {
    id: 'p6',
    title: 'Organic Brown Rice – Sonamasuri',
    image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png'),
    saving: '15% OFF',
    labels: ['1 Kg'],
    rating: '4.1 (920)',
    time: '11 MINS',
    stockText: 'In stock',
    price: 109,
    mrp: 129,
    unitPrice: '₹10.9/100 g',
  },
];

const CartScreen = () => {
  const navigation = useNavigation();
  const totalAmount = 1667;

  return (
    <CartCheckoutWrapper
      title="Checkout"
      onBackPress={() => navigation.goBack()}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
      />

      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* DELIVERY BANNER */}
          <View style={styles.deliveryBox}>
            <Text style={styles.deliveryText}>Free delivery in 11 minutes</Text>
            <Text style={styles.subText}>Shipment of 4 items</Text>
          </View>

          {/* CART ITEMS */}
          <View style={styles.cartContainer}>
            {cartItems.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <Image source={item.image} style={styles.cartImg} />

                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemSize}>{item.size}</Text>
                </View>

                <View style={styles.qtyPriceWrap}>
                  <View style={styles.qtyBox}>
                    <TouchableOpacity style={styles.qtyBtn}>
                      <Text style={styles.qtyText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyNumber}>{item.qty}</Text>

                    <TouchableOpacity style={styles.qtyBtn}>
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>You might also like</Text>

          <ProductGridSection
            title="Lip Care"
            data={sampleProducts}
            onAdd={(id, qty) => console.log(id, qty)}
          />

          <BillDetailsSection />
          <DeliveryInstructionsSection />

          <ProductGridSection
            title="More products"
            data={sampleProducts}
            onAdd={(id, qty) => console.log(id, qty)}
          />
        </ScrollView>

        {/* STICKY ORDER BAR */}
        <View style={styles.orderBar}>
          <View>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>

          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.orderBtnText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CartCheckoutWrapper>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollContent: {
    paddingBottom: 90,
  },

  deliveryBox: {
    backgroundColor: Colors.success + '20',
    padding: Spacing.lg,
    borderRadius: Radius.md,
  },

  deliveryText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.success,
  },

  subText: {
    fontSize: 12,
    color: Colors.gray500,
    marginTop: Spacing.xs,
  },

  cartContainer: {
    marginTop: Spacing.xxs,
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderColor: Colors.gray200,
  },

  cartImg: {
    width: 70,
    height: 70,
    marginRight: Spacing.md,
  },

  itemInfo: {
    flex: 1,
  },

  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray900,
  },

  itemSize: {
    fontSize: 12,
    color: Colors.gray500,
    marginTop: Spacing.xs,
  },

  qtyPriceWrap: {
    alignItems: 'flex-end',
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '20',
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.md,
    height: 32,
  },

  qtyBtn: {
    paddingHorizontal: Spacing.xs,
  },

  qtyText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.success,
  },

  qtyNumber: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: Spacing.xs,
    color: Colors.gray900,
  },

  itemPrice: {
    marginTop: Spacing.xs,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray900,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
    color: Colors.gray900,
  },

  orderBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderColor: Colors.gray200,
  },

  totalLabel: {
    fontSize: 12,
    color: Colors.gray500,
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
  },

  orderBtn: {
    backgroundColor: Colors.success,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: Radius.md,
  },

  orderBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

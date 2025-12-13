import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../styles';
import SearchBar from './SearchBar';
import CategoryTabBar from './CategoryTabBar';
import { Category, Product } from '../../types';
import HomeIcon from '../../assest/home';
import SaleGrid from './SaleGrid';
import BannerCarousel from './BannerCarousel';
import ProductGridSection from './ProductGridSection';
import SeeAllSection from './SeeAllSection';
import EventsSection from './EventsSection';
import BottomBrandSection from '../../components/common/ButtomSection';

// Get status bar height manually
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  }
  // For Android
  return StatusBar.currentHeight || 24;
};

const categoriesSample: Category[] = [
  {
    id: 'all',
    title: 'All',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: 'wedding',
    title: 'Wedding',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: 'winter',
    title: 'Winter',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: 'electronics',
    title: 'Electronics',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '1',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '2',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '3',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '4',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '5',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
];

const productsSample: Product[] = [
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
  {
    id: 'p7',
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

export const bannerSample = [
  {
    id: 'b1',
    image: require('../../assest/dummy/image.png'),
  },
  {
    id: 'b2',
    image: require('../../assest/dummy/image.png'),
  },
  {
    id: 'b3',
    image: require('../../assest/dummy/image.png'),
  },
  {
    id: 'b4',
    image: require('../../assest/dummy/image.png'),
  },
];

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

export const eventData = [
  {
    id: '1',
    title: 'Premium & Organic',
    image: require('../../assest/dummy/image.png'),
  },
  {
    id: '2',
    title: 'Cheese Mania',
    image: require('../../assest/dummy/image.png'),
  },
  {
    id: '3',
    title: 'Cheese Mania',
    image: require('../../assest/dummy/image.png'),
  },
  {
    id: '4',
    title: 'Cheese Mania',
    image: require('../../assest/dummy/image.png'),
  },
];

const HomeScreen = () => {
  const [selectedCat, setSelectedCat] = React.useState('all');
  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={styles.container}>
      <View style={[styles.hero, { paddingTop: statusBarHeight + Spacing.lg }]}>
        <SearchBar />
        <View style={{ height: Spacing.md }} />
        <CategoryTabBar
          categories={categoriesSample}
          selectedId={selectedCat}
          onSelect={setSelectedCat}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <SaleGrid data={productsSample} onAdd={id => console.log('add', id)} />

        <BannerCarousel data={bannerSample} onPress={id => console.log(id)} />

        <ProductGridSection
          title="Step up your shoe care game"
          data={sampleProducts}
          onAdd={(id, qty) => console.log(id, qty)}
        />

        <SeeAllSection title="See all products" onPress={() => {}} />

        <ProductGridSection
          title="Trending section"
          data={sampleProducts}
          onAdd={(id, qty) => console.log(id, qty)}
          bg={Colors.gray50}
        />

        <SeeAllSection title="See all products" onPress={() => {}} />

        <ProductGridSection
          title="Explore the world of electronics"
          data={sampleProducts}
          onAdd={(id, qty) => console.log(id, qty)}
        />

        <SeeAllSection title="See all products" onPress={() => {}} />

        <EventsSection title="Events this week" data={eventData} />

        <ProductGridSection
          title="More for you"
          data={sampleProducts}
          onAdd={(id, qty) => console.log(id, qty)}
        />

        <SeeAllSection title="See all products" onPress={() => {}} />

        <BottomBrandSection />
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },

  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    ...Shadows.soft,
  },
});

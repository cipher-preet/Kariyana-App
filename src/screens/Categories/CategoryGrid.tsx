import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';

const { width } = Dimensions.get('window');

const NUM_COLUMNS = 4;
const HORIZONTAL_GAP = Spacing.md; 

const AVAILABLE_WIDTH = width - Spacing.lg * 2;


const CARD_SIZE =
  (AVAILABLE_WIDTH - HORIZONTAL_GAP * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

type CategoryItem = {
  id: string;
  name: string;
  image: any;
};

const categories: CategoryItem[] = [
  { id: '1', name: 'Vegetables & Fruits', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '2', name: 'Atta, Rice & Dal', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '3', name: 'Oil, Ghee & Masala', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '4', name: 'Dairy, Bread & Eggs', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '5', name: 'Bakery & Biscuits', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '6', name: 'Dry Fruits & Cereals', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '7', name: 'Chicken, Meat & Fish', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
  { id: '8', name: 'Kitchenware & Appliances', image: require('../../assest/dummy/pngtree-3d-beauty-cosmetics-product-design-png-image_3350323-removebg-preview.png') },
];

const CategoryGrid = () => {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={NUM_COLUMNS}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.9}>
          <View style={styles.iconBox}>
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.label} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryGrid;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.xxs,   
    paddingBottom: Spacing.xxl,
  },

  row: {
    justifyContent: 'space-between', 
    marginBottom: Spacing.lg,
  },

  card: {
    width: CARD_SIZE,
    alignItems: 'center',
  },

  iconBox: {
    width: CARD_SIZE * 0.95,
    height: CARD_SIZE * 0.95,
    backgroundColor: '#EAF7F3',       
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '80%',
    height: '80%',
  },

  label: {
    marginTop: Spacing.sm,
    fontSize: 12.5,
    fontWeight: '600',
    color: Colors.gray800,
    textAlign: 'center',
  },
});

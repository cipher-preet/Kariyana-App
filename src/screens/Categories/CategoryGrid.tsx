import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Spacing } from '../../styles';

const HORIZONTAL_GAP = 10;

const CategoryGrid: React.FC<any> = ({ data }) => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const columns =
    width >= 900 ? 8 : width >= 700 ? 6 : width >= 520 ? 5 : width < 340 ? 3 : 4;
  const availableWidth = width - Spacing.md * 2;
  const cardSize =
    (availableWidth - HORIZONTAL_GAP * (columns - 1)) / columns;

  return (
    <View style={styles.grid}>
      {data.map((item: any, index: number) => (
        <TouchableOpacity
          key={item._id || item.id || `${item.name}-${index}`}
          style={[styles.card, { width: cardSize }]}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('ProductGrid', {
              categoryId: item._id,
              categoryName: item.name,
              type: 'Childcategory',
            })
          }
        >
          <View style={[styles.iconBox, { width: cardSize, height: cardSize * 0.92 }]}>
            <Image
              source={{ uri: item.images }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.label} numberOfLines={2}>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: HORIZONTAL_GAP,
    paddingBottom: Spacing.md,
  },

  card: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  iconBox: {
    backgroundColor: '#F5F6F7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '84%',
    height: '84%',
  },

  label: {
    marginTop: 5,
    fontSize: 10.8,
    fontWeight: '700',
    color: '#202124',
    textAlign: 'center',
    lineHeight: 14,
    minHeight: 28,
  },
});

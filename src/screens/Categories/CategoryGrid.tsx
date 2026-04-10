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
import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Radius } from '../../styles';

const { width } = Dimensions.get('window');

const NUM_COLUMNS = 4;
const HORIZONTAL_GAP = Spacing.md;

const AVAILABLE_WIDTH = width - Spacing.lg * 2;

const CARD_SIZE =
  (AVAILABLE_WIDTH - HORIZONTAL_GAP * (NUM_COLUMNS - 1)) / NUM_COLUMNS;

const CategoryGrid: React.FC<any> = ({ data }) => {
  const navigation = useNavigation<any>();
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      numColumns={NUM_COLUMNS}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      columnWrapperStyle={styles.row}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate('productgrid', {
              categoryId: item._id,
              categoryName: item.name,
              type: 'Childcategory',
            })
          }
        >
          <View style={styles.iconBox}>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: Spacing.md,
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

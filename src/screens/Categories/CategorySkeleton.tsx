import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 4;
const GAP = 16;
const CARD_WIDTH = (width - GAP * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

const CategorySkeleton = () => {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.title}
      />
      <View style={styles.row}>
        {[...Array(NUM_COLUMNS)].map((_, index) => (
          <View key={index} style={styles.card}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.image}
            />
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.text}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default CategorySkeleton;

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  title: {
    width: 160,
    height: 18,
    borderRadius: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: 70,
    borderRadius: 8,
  },
  text: {
    marginTop: 6,
    height: 12,
    borderRadius: 4,
  },
});

import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { Spacing } from '../../styles';

const GAP = 8;

const CategorySkeleton = () => {
  const { width } = useWindowDimensions();
  const columns =
    width >= 900 ? 8 : width >= 700 ? 6 : width >= 520 ? 5 : width < 340 ? 3 : 4;
  const cardWidth =
    (width - Spacing.md * 2 - GAP * (columns - 1)) / columns;

  return (
    <View style={styles.container}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.title}
      />
      <View style={styles.row}>
        {[...Array(columns)].map((_, index) => (
          <View key={index} style={[styles.card, { width: cardWidth }]}>
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={[styles.image, { height: cardWidth }]}
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
    marginBottom: 20,
  },
  title: {
    width: 120,
    height: 16,
    borderRadius: 4,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flexShrink: 0,
  },
  image: {
    width: '100%',
    borderRadius: 14,
  },
  text: {
    marginTop: 6,
    height: 10,
    borderRadius: 4,
  },
});

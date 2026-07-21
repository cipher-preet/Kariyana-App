// src/components/BannerCarousel.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { Spacing } from '../../styles';

import BannerCard from './BannerCard';

type Banner = {
  id: string;
  title?: string;
  subtitle?: string;
  image: any;
};

type Props = {
  data: Banner[];
  autoPlayInterval?: number;
  onPress?: (id: string) => void;
};

const BannerCarousel: React.FC<Props> = ({
  data,
  onPress,
  autoPlayInterval = 3500,
}) => {
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const itemWidth = width - Spacing.lg * 2;
  const itemGap = itemWidth + Spacing.md;

  // AUTO PLAY (UNCHANGED)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!data?.length) return;

      currentIndex.current =
        (currentIndex.current + 1) % data.length;

      flatListRef.current?.scrollToOffset({
        offset: currentIndex.current * itemGap,
        animated: true,
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [data, autoPlayInterval, itemGap]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemGap}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * itemGap,
            index * itemGap,
            (index + 1) * itemGap,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.96, 1, 0.96],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <BannerCard
                banner={item}
                width={itemWidth}
                onPress={() => onPress?.(item.id)}
              />
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default BannerCarousel;


const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.sm,
  },
});

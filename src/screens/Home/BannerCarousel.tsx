// src/components/BannerCarousel.tsx
import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { Spacing } from '../../styles';

import BannerCard from './BannerCard';

const { width } = Dimensions.get('window');

const ITEM_WIDTH = width * 0.86;                
const ITEM_GAP = ITEM_WIDTH + Spacing.lg;       
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
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);

  // AUTO PLAY (UNCHANGED)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!data?.length) return;

      currentIndex.current =
        (currentIndex.current + 1) % data.length;

      flatListRef.current?.scrollToOffset({
        offset: currentIndex.current * ITEM_GAP,
        animated: true,
      });
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [data, autoPlayInterval]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_GAP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: Spacing.lg,   // was 16
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_GAP,
            index * ITEM_GAP,
            (index + 1) * ITEM_GAP,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View style={{ transform: [{ scale }] }}>
              <BannerCard
                banner={item}
                width={ITEM_WIDTH}
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
    marginTop: Spacing.md,            
  },
});

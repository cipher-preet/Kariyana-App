import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import { Colors } from '../../styles';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = 400;

type ProductImageSectionProps = {
  images: string[];
};

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  images,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
      />

      {/* IMAGE CAROUSEL */}
      <FlatList
        ref={flatRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={onScrollEnd}
        renderItem={({ item }) => (
          <View style={styles.imageWrap}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}
      />

      <View style={styles.dots}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === activeIndex && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

export default ProductImageSection;

const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    backgroundColor: '#ffffff',
  },

  imageWrap: {
    width,
    height: HERO_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '90%',
    height: '90%',
  },

  dots: {
    position: 'absolute',
    bottom: 12,
    flexDirection: 'row',
    alignSelf: 'center',
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#cfcfcf',
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#1f1f1f',
    width: 7,
    height: 7,
  },
  rightIcons: {
    flexDirection: 'row',
  },
});

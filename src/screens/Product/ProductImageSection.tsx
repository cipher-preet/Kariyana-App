import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Colors, Radius, Spacing } from '../../styles';

const BackIcon = ({ color = Colors.gray900 }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18 9 12l6-6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

type ProductImageSectionProps = {
  images: string[];
};

const ProductImageSection: React.FC<ProductImageSectionProps> = ({
  images,
}) => {
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const { width, height } = useWindowDimensions();
  const heroHeight = Math.min(Math.max(width * 0.88, 260), height * 0.52, 420);

  const productImages = useMemo(
    () => images.filter(item => typeof item === 'string' && item.trim()),
    [images],
  );

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.getParent()?.navigate('Home', { screen: 'HomeMain' });
  };

  return (
    <View style={[styles.container, { height: heroHeight }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
      />

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.82}
        onPress={handleBack}
      >
        <BackIcon />
      </TouchableOpacity>

      {productImages.length > 0 ? (
        <FlatList
          ref={flatRef}
          data={productImages}
          horizontal
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => `${item}-${index}`}
          onMomentumScrollEnd={onScrollEnd}
          renderItem={({ item }) => (
            <View style={[styles.imageWrap, { width, height: heroHeight }]}>
              <Image
                source={{ uri: item }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
        />
      ) : (
        <View style={[styles.emptyImageWrap, { height: heroHeight }]}>
          <Text style={styles.emptyImageText}>No image available</Text>
        </View>
      )}

      {productImages.length > 1 && (
        <View style={styles.dots}>
          {productImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === activeIndex && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductImageSection;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },

  backButton: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.md,
    zIndex: 2,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },

  image: {
    width: '100%',
    height: '100%',
    maxWidth: 300,
    borderRadius: Radius.sm,
  },

  emptyImageWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
  },

  emptyImageText: {
    color: Colors.gray500,
    fontSize: 12,
    fontWeight: '700',
  },

  dots: {
    position: 'absolute',
    bottom: Spacing.md,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray300,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#0B6B3A',
    width: 16,
    borderRadius: Radius.full,
  },
});

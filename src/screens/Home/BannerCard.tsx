// src/components/BannerCard.tsx
import React from 'react';
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
} from '../../styles';

type Props = {
  banner: {
    id: string;
    title?: string;
    subtitle?: string;
    image: any;
  };
  width: number;
  onPress?: () => void;
};

const BannerCard: React.FC<Props> = ({ banner, width, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.card, { width }]}
    >
      <ImageBackground
        source={banner.image}
        style={styles.image}
        resizeMode="cover"
      >
        <View style={styles.scrim} />
        <View style={styles.textBox}>
          <Text style={styles.kicker}>Market specials</Text>
          <Text style={styles.title}>
            {banner.title || 'Fresh stock, better margins'}
          </Text>

          {banner.subtitle && (
            <Text style={styles.subtitle}>{banner.subtitle}</Text>
          )}

          <TouchableOpacity style={styles.shopBtn}>
            <Text style={styles.shopTxt}>Shop now</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default BannerCard;


const styles = StyleSheet.create({
  card: {
    height: 172,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#163326',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },

  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  textBox: {
    padding: Spacing.lg,
  },

  kicker: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    backgroundColor: '#F7CB14',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    color: '#0B6B3A',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },

  title: {
    fontSize: 21,
    fontWeight: '700',
    color: Colors.white,
    maxWidth: '72%',
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.9)',
    marginTop: Spacing.xxs,
    marginBottom: Spacing.md,
  },

  shopBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: Radius.full,
  },

  shopTxt: {
    color: Colors.gray900,
    fontWeight: '700',
    fontSize: 12,
  },
});

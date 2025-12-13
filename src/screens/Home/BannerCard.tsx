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
  Shadows,
  Typography,
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
        {/* TEXT AREA */}
        <View style={styles.textBox}>
          {banner.title && (
            <Text style={styles.title}>{banner.title}</Text>
          )}

          {banner.subtitle && (
            <Text style={styles.subtitle}>{banner.subtitle}</Text>
          )}

          {/* SHOP NOW BUTTON (UNCHANGED) */}
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
    height: 210,                     
    borderRadius: Radius.xl,         
    overflow: 'hidden',
    ...Shadows.card,
  },

  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },

  textBox: {
    padding: Spacing.xl,              
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.gray900,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.gray700,
    marginTop: Spacing.xxs,           
    marginBottom: Spacing.md,        
  },

  shopBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,    
    paddingVertical: Spacing.xs,      
    backgroundColor: Colors.black,
    borderRadius: Radius.full,       
  },

  shopTxt: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
});

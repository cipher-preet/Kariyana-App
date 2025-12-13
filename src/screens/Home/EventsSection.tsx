import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
  Typography,
} from '../../styles';

const SCREEN_WIDTH = Dimensions.get('window').width;

type EventItem = {
  id: string;
  title: string;
  image: any;
  onPress?: () => void;
};

type Props = {
  title: string;
  data: EventItem[];
};

const CARD_HEIGHT = 200;

const EventsSection: React.FC<Props> = ({ title, data }) => {
  if (data.length < 3) return null;

  const [big, small1, small2] = data;

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.row}>
        {/* LEFT BIG CARD */}
        <TouchableOpacity
          style={styles.bigCard}
          activeOpacity={0.9}
          onPress={big.onPress}
        >
          <Image source={big.image} style={styles.image} />
          <Text style={styles.overlayText}>{big.title}</Text>
        </TouchableOpacity>

        {/* RIGHT COLUMN */}
        <View style={styles.rightColumn}>
          <TouchableOpacity
            style={styles.smallCard}
            activeOpacity={0.9}
            onPress={small1.onPress}
          >
            <Image source={small1.image} style={styles.image} />
            <Text style={styles.overlayText}>{small1.title}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallCard}
            activeOpacity={0.9}
            onPress={small2.onPress}
          >
            <Image source={small2.image} style={styles.image} />
            <Text style={styles.overlayText}>{small2.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EventsSection;



const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.md,             
    marginBottom: Spacing.lg,          
  },

  title: {
    fontSize: 20,                      
    fontWeight: '800',
    color: Colors.gray900,
    marginBottom: Spacing.lg,          
    paddingHorizontal: Spacing.lg,     
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,     
  },

  /* LEFT BIG CARD */
  bigCard: {
    width: SCREEN_WIDTH * 0.55,
    height: CARD_HEIGHT,
    borderRadius: Radius.lg,           
    overflow: 'hidden',
    marginRight: Spacing.md,          
  },

  /* RIGHT COLUMN */
  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },

  smallCard: {
    height: CARD_HEIGHT / 2 - 5,       
    borderRadius: Radius.lg,           
    overflow: 'hidden',
  },

  /* COMMON */
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlayText: {
    position: 'absolute',
    bottom: Spacing.sm,                
    left: Spacing.sm,                  
    color: Colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
});

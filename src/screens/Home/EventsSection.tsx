import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
} from '../../styles';

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
  const { width } = useWindowDimensions();

  if (data.length === 0) return null;

  const [big, small1, small2] = data;
  const isNarrow = width < 340;
  const bigCardWidth = isNarrow ? '100%' : width * 0.55;
  const hasSideCards = data.length >= 3 && !isNarrow;

  return (
    <View style={styles.section}>
      <Text style={styles.kicker}>Offers and campaigns</Text>
      <Text style={styles.title}>{title}</Text>

      <View
        style={[
          styles.row,
          isNarrow && styles.rowStacked,
          data.length < 3 && styles.singleColumn,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.bigCard,
            hasSideCards && { width: bigCardWidth },
            (!hasSideCards || isNarrow) && styles.stackedBigCard,
          ]}
          activeOpacity={0.9}
          onPress={big.onPress}
        >
          <Image source={big.image} style={styles.image} />
          <View style={styles.overlay} />
          <Text style={styles.overlayText}>{big.title}</Text>
        </TouchableOpacity>

        {hasSideCards && (
          <View style={styles.rightColumn}>
            <TouchableOpacity
              style={styles.smallCard}
              activeOpacity={0.9}
              onPress={small1.onPress}
            >
              <Image source={small1.image} style={styles.image} />
              <View style={styles.overlay} />
              <Text style={styles.overlayText}>{small1.title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallCard}
              activeOpacity={0.9}
              onPress={small2.onPress}
            >
              <Image source={small2.image} style={styles.image} />
              <View style={styles.overlay} />
              <Text style={styles.overlayText}>{small2.title}</Text>
            </TouchableOpacity>
          </View>
        )}

        {!hasSideCards &&
          data.slice(1).map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.stackedBigCard}
              activeOpacity={0.9}
              onPress={item.onPress}
            >
              <Image source={item.image} style={styles.image} />
              <View style={styles.overlay} />
              <Text style={styles.overlayText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default EventsSection;



const styles = StyleSheet.create({
  section: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  kicker: {
    color: Colors.primary,
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: Spacing.xxs,
    paddingHorizontal: Spacing.lg,
  },

  title: {
    fontSize: 19,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },

  row: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
  },

  rowStacked: {
    flexDirection: 'column',
  },

  singleColumn: {
    flexDirection: 'column',
  },

  bigCard: {
    height: CARD_HEIGHT,
    width: '100%',
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginRight: Spacing.md,
    shadowColor: '#163326',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },

  stackedBigCard: {
    height: CARD_HEIGHT,
    width: '100%',
    borderRadius: Radius.lg,
    overflow: 'hidden',
    marginRight: 0,
    marginBottom: Spacing.md,
    shadowColor: '#163326',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },

  rightColumn: {
    flex: 1,
    justifyContent: 'space-between',
  },

  smallCard: {
    height: CARD_HEIGHT / 2 - 5,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    shadowColor: '#163326',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  overlayText: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});

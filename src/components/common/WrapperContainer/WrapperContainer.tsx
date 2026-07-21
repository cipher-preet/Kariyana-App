import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing } from '../../../styles';

import SearchBar from '../../../screens/Home/SearchBar';
import { BoltIcon, LocationIcon } from '../../../screens/Home/HomeIcons';

const HEADER_COLORS = {
  page: '#F6F8F2',
  hero: '#0B6B3A',
  heroDark: '#07512E',
  accent: '#F7CB14',
};

const getStatusBarHeight = () => {
  return Platform.OS === 'ios'
    ? 44
    : StatusBar.currentHeight || 24;
};

interface WrapperProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  showHeaderCopy?: boolean;
  showDeliveryBadge?: boolean;
  showBackButton?: boolean;
}

const BackIcon = ({ color = Colors.white }) => (
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

const WrapperContainer: React.FC<WrapperProps> = ({ 
  title = 'Categories',
  subtitle = 'Find daily essentials faster',
  children,
  scrollable = true,
  showHeaderCopy = true,
  showDeliveryBadge = true,
  showBackButton = false,
}) => {
  const statusBarHeight = getStatusBarHeight();
  const navigation = useNavigation<any>();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.getParent()?.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { paddingTop: statusBarHeight + Spacing.md },
        ]}
      >
        {(showBackButton || showHeaderCopy || showDeliveryBadge) && (
          <View style={styles.locationRow}>
            {showBackButton && (
              <TouchableOpacity
                style={styles.backButton}
                activeOpacity={0.82}
                onPress={handleBack}
              >
                <BackIcon />
              </TouchableOpacity>
            )}

            {showHeaderCopy && (
              <View style={styles.locationCopy}>
                {subtitle ? (
                  <View style={styles.locationLabelRow}>
                    <LocationIcon size={13} color="rgba(255,255,255,0.74)" />
                    <Text style={styles.eyebrow}>{subtitle}</Text>
                  </View>
                ) : null}
                <Text style={styles.title}>{title}</Text>
              </View>
            )}

            {showDeliveryBadge && (
              <View style={styles.deliveryBadge}>
                <BoltIcon size={12} color={HEADER_COLORS.hero} />
                <Text style={styles.deliveryBadgeText}>24-48 hrs</Text>
              </View>
            )}
          </View>
        )}

        <View
          style={[
            !showHeaderCopy && !showDeliveryBadge && styles.searchOnlyHeader,
          ]}
        >
          <SearchBar />
        </View>
      </View>

      {scrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentScroll}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={styles.contentView}>
          {children}
        </View>
      )}
    </View>
  );
};

export default WrapperContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER_COLORS.page,
  },

  header: {
    width: '100%',
    backgroundColor: HEADER_COLORS.hero,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: HEADER_COLORS.heroDark,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  locationCopy: {
    flex: 1,
    paddingRight: Spacing.sm,
  },

  locationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  eyebrow: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 10.5,
    fontWeight: '600',
  },

  title: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 1,
  },

  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: HEADER_COLORS.accent,
    borderRadius: 999,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },

  deliveryBadgeText: {
    color: HEADER_COLORS.hero,
    fontSize: 10.5,
    fontWeight: '600',
  },

  searchOnlyHeader: {
    paddingTop: Spacing.xs,
  },

  contentScroll: {
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },

  contentView: {
    flex: 1,
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
});

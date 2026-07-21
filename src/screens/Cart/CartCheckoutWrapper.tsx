import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Colors, Spacing, Radius, Shadows } from '../../styles';
import { BackIcon } from './CartIcons';

interface Props {
  title: string;
  onBackPress: () => void;
  children: React.ReactNode;
}

const CartCheckoutWrapper: React.FC<Props> = ({
  title,
  onBackPress,
  children,
}) => {
  const statusBarHeight = getStatusBarHeight();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor(HEADER_COLORS.background);
      StatusBar.setTranslucent(false);
    }, []),
  );

  return (
    <View style={styles.safe}>
      <StatusBar
        backgroundColor={HEADER_COLORS.background}
        barStyle="light-content"
        translucent={false}
      />
      <View style={styles.container}>
        <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.sm }]}>
          <TouchableOpacity
            onPress={onBackPress}
            activeOpacity={0.78}
            style={styles.backBtn}
          >
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.titleWrap}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>Review items before placing order</Text>
          </View>
        </View>

        <View style={styles.content}>{children}</View>
      </View>
    </View>
  );
};

export default CartCheckoutWrapper;

const HEADER_COLORS = {
  background: '#0B6B3A',
  page: '#F6F8F2',
};

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') return 44;
  return StatusBar.currentHeight || 24;
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: HEADER_COLORS.page,
  },

  container: {
    flex: 1,
    backgroundColor: HEADER_COLORS.page,
  },

  header: {
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: HEADER_COLORS.background,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    ...Shadows.soft,
  },

  titleWrap: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },

  subtitle: {
    marginTop: 2,
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.76)',
  },

  content: {
    flex: 1,
  },
});

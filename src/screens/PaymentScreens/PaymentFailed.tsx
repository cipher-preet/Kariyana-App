import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

const PAGE_BG = '#F6F8F2';
const ERROR_RED = '#DC2626';
const BRAND_GREEN = '#0B6B3A';

const FailedIcon = () => (
  <Svg width={42} height={42} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill={ERROR_RED} />
    <Path
      d="m8.5 8.5 7 7M15.5 8.5l-7 7"
      stroke={Colors.white}
      strokeWidth={2.4}
      strokeLinecap="round"
    />
  </Svg>
);

const PaymentFailed = ({ route, navigation }: any) => {
  const { orderId } = route.params || {};

  const goToTab = (tabName: string, screen: string) => {
    const parent = navigation.getParent?.();

    if (parent) {
      parent.navigate(tabName, { screen });
      return;
    }

    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <View style={styles.iconCircle}>
          <FailedIcon />
        </View>

        <Text style={styles.title}>Payment failed</Text>
        <Text style={styles.subtitle}>
          We could not complete the payment. Your order is still safe to retry.
        </Text>

        {orderId ? (
          <View style={styles.detailsCard}>
            <Text style={styles.label}>Order ID</Text>
            <Text numberOfLines={2} style={styles.value}>
              {orderId}
            </Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.86}
          onPress={() => goToTab('Cart', 'CartMain')}
        >
          <Text style={styles.primaryText}>Back to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          activeOpacity={0.82}
          onPress={() => goToTab('Home', 'HomeMain')}
        >
          <Text style={styles.secondaryText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentFailed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PAGE_BG,
    justifyContent: 'center',
    padding: Spacing.lg,
  },

  panel: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDE2',
    ...Shadows.card,
  },

  iconCircle: {
    width: 78,
    height: 78,
    borderRadius: Radius.full,
    backgroundColor: '#FFF1F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  title: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: '800',
    color: Colors.gray900,
    textAlign: 'center',
  },

  subtitle: {
    marginTop: Spacing.xs,
    fontSize: 13,
    lineHeight: 20,
    color: Colors.gray600,
    fontWeight: '500',
    textAlign: 'center',
  },

  detailsCard: {
    width: '100%',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: '#FAFCF8',
    borderWidth: 1,
    borderColor: '#E8EDE2',
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray500,
    textTransform: 'uppercase',
  },

  value: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    color: Colors.gray900,
  },

  primaryBtn: {
    width: '100%',
    height: 50,
    borderRadius: Radius.md,
    backgroundColor: ERROR_RED,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },

  primaryText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
  },

  secondaryBtn: {
    marginTop: Spacing.sm,
    minHeight: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryText: {
    color: BRAND_GREEN,
    fontSize: 13,
    fontWeight: '800',
  },
});

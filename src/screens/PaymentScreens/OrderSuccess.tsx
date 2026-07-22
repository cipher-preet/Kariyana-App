import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

const BRAND_GREEN = '#0B6B3A';
const PAGE_BG = '#F6F8F2';

const CheckIcon = () => (
  <Svg width={42} height={42} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} fill={BRAND_GREEN} />
    <Path
      d="m7.7 12.2 2.7 2.7 6-6.2"
      stroke={Colors.white}
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OrderSuccess = ({ route, navigation }: any) => {
  const { order } = route.params;

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
          <CheckIcon />
        </View>

        <Text style={styles.title}>Order placed</Text>
        <Text style={styles.subtitle}>
          Your order has been confirmed and is ready for processing.
        </Text>

        <View style={styles.detailsCard}>
          <InfoRow label="Order ID" value={order?._id || '-'} />
          <View style={styles.divider} />
          <InfoRow label="Amount Paid" value={`Rs${order?.totalAmount || 0}`} />
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          activeOpacity={0.86}
          onPress={() => goToTab('Home', 'HomeMain')}
        >
          <Text style={styles.primaryText}>Go to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          activeOpacity={0.82}
          onPress={() => goToTab('Account', 'MyOrdersScreen')}
        >
          <Text style={styles.secondaryText}>View Order Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text numberOfLines={2} style={styles.value}>
      {value}
    </Text>
  </View>
);

export default OrderSuccess;

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
    backgroundColor: '#E8F5EC',
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

  infoRow: {
    gap: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#E8EDE2',
    marginVertical: Spacing.md,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.gray500,
    textTransform: 'uppercase',
  },

  value: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '800',
    color: Colors.gray900,
  },

  primaryBtn: {
    width: '100%',
    height: 50,
    borderRadius: Radius.md,
    backgroundColor: BRAND_GREEN,
    justifyContent: 'center',
    alignItems: 'center',
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

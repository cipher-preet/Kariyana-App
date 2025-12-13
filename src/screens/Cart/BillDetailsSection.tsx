import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '../../styles';

const BillDetailsSection = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bill details</Text>

      <Row
        label="Items total"
        value="₹663"
        strike="₹652"
        badge="Saved ₹11"
      />

      <Row
        label="Delivery charge"
        value="FREE"
        strike="₹30"
        valueStyle={{ color: Colors.success }}
      />

      <Row label="Handling charge" value="₹4" />
      <Row label="Tip for your delivery partner" value="₹1,000" />

      <View style={styles.divider} />

      <View style={styles.grandRow}>
        <Text style={styles.grandText}>Grand total</Text>
        <Text style={styles.grandAmount}>₹1,656</Text>
      </View>

      <View style={styles.savingBox}>
        <Text style={styles.savingText}>
          Your total savings{' '}
          <Text style={styles.savingStrong}>₹41</Text>
        </Text>
        <Text style={styles.savingSub}>
          Includes ₹30 savings through free delivery
        </Text>
      </View>
    </View>
  );
};

export default BillDetailsSection;

/* ================= ROW ================= */

const Row = ({
  label,
  value,
  strike,
  badge,
  valueStyle = {},
}: {
  label: string;
  value: string;
  strike?: string;
  badge?: string;
  valueStyle?: TextStyle;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>

    <View style={styles.right}>
      {badge && <Text style={styles.badge}>{badge}</Text>}
      {strike && <Text style={styles.strike}>{strike}</Text>}
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 14,
    marginTop: 12,

    shadowColor: Colors.black,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: Colors.gray900,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  label: {
    fontSize: 14,
    color: Colors.gray700,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  badge: {
    fontSize: 11,
    backgroundColor: Colors.primaryLight,
    color: Colors.primaryDark,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
    fontWeight: '600',
  },

  strike: {
    textDecorationLine: 'line-through',
    color: Colors.gray500,
    marginRight: 6,
    fontSize: 13,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray900,
  },

  divider: {
    borderTopWidth: 1,
    borderColor: Colors.gray200,
    marginVertical: 10,
  },

  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  grandText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray900,
  },

  grandAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.gray900,
  },

  savingBox: {
    backgroundColor: Colors.primaryLight,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  savingText: {
    fontSize: 13,
    color: Colors.primaryDark,
  },

  savingStrong: {
    fontWeight: '700',
  },

  savingSub: {
    fontSize: 12,
    color: Colors.gray600,
    marginTop: 2,
  },
});

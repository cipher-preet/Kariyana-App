import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { Colors, Spacing, Radius } from '../../styles';

interface BilledItems {
  subtotal: number;
  totalItems: number;
}

const BillDetailsSection: React.FC<BilledItems> = ({
  subtotal,
  totalItems,
}) => {
  const formattedSubtotal = `Rs${subtotal ?? 0}`;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Bill details</Text>

      <Row label={`Items total (${totalItems})`} value={formattedSubtotal} />

      <Row
        label="Delivery charge"
        value="FREE"
        strike="Rs100"
        valueStyle={styles.freeValue}
      />

      <View style={styles.divider} />

      <View style={styles.grandRow}>
        <Text style={styles.grandText}>Grand total</Text>
        <Text style={styles.grandAmount}>{formattedSubtotal}</Text>
      </View>

      <View style={styles.savingBox}>
        <Text style={styles.savingSub}>
          Includes Rs100 savings through free delivery
        </Text>
      </View>
    </View>
  );
};

export default BillDetailsSection;

const Row = ({
  label,
  value,
  strike,
  valueStyle = {},
}: {
  label: string;
  value: number | string;
  strike?: string;
  valueStyle?: TextStyle;
}) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>

    <View style={styles.right}>
      {strike && <Text style={styles.strike}>{strike}</Text>}
      <Text style={[styles.value, valueStyle]}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    color: '#202124',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray700,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  strike: {
    textDecorationLine: 'line-through',
    color: Colors.gray500,
    marginRight: 6,
    fontSize: 12,
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#202124',
  },

  freeValue: {
    color: '#0B6B3A',
  },

  divider: {
    borderTopWidth: 1,
    borderColor: '#F0F1F3',
    marginVertical: Spacing.sm,
  },

  grandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  grandText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },

  grandAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#202124',
  },

  savingBox: {
    backgroundColor: '#EAF6EE',
    padding: Spacing.sm,
    borderRadius: Radius.md,
    marginTop: Spacing.sm,
  },

  savingSub: {
    fontSize: 11.5,
    color: '#0B6B3A',
    fontWeight: '700',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import HorizontalProgress from './HorizontalProgress';

const OrderDetailsScreen = () => {
  const order = {
    id: 'OD337079112704155100',
    status: 'REFUND',

    items: [
      { name: 'iPhone 14', qty: 1, price: 175 },
      { name: 'AirPods Pro', qty: 2, price: 249 },
    ],

    address: '83B Shahimajra Phase 3, Mohali Bypass',
    name: 'Preet',
    phone: '9306754257',

    pricing: {
      listing: 580,
      selling: 175,
      fees: 7,
      discount: 6,
      total: 176,
    },

    payment: 'Credit Card',
  };

  const steps = [
    { title: 'Order Confirmed', date: 'Feb 28' },
    { title: 'Dispatch', date: 'Feb 28' },
    { title: 'Out for Delhevery', date: 'Mar 04' },
    { title: 'Delivered', date: 'Mar 04' },
  ];

  const statusMap: any = {
    CONFIRMED: 0,
    CANCELLED: 1,
    REFUND: 2,
  };

  const currentStep = statusMap[order.status] ?? 0;

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Order Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>Refund completed</Text>
          <HorizontalProgress steps={steps} currentStep={currentStep} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items in this order</Text>

          {order.items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQty}>Qty: {item.qty}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery details</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>{order.address}</Text>

          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>
            {order.name} • {order.phone}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price details</Text>

          <Row
            label="Listing price"
            value={`₹${order.pricing.listing}`}
            strike
          />
          <Row label="Selling price" value={`₹${order.pricing.selling}`} />
          <Row label="Fees" value={`₹${order.pricing.fees}`} />
          <Row
            label="Discount"
            value={`-₹${order.pricing.discount}`}
            highlight
          />

          <View style={styles.divider} />

          <Row label="Total amount" value={`₹${order.pricing.total}`} bold />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment</Text>

          <Text style={styles.value}>{order.payment}</Text>

          <TouchableOpacity style={styles.invoiceBtn}>
            <Text style={styles.invoiceText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order ID</Text>
          <Text style={styles.value}>{order.id}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetailsScreen;

const Row = ({ label, value, bold, strike, highlight }: any) => (
  <View style={styles.rowBetween}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text
      style={[
        styles.rowValue,
        bold && { fontWeight: '700' },
        strike && { textDecorationLine: 'line-through', color: '#999' },
        highlight && { color: '#16A34A' },
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },

  statusCard: {
    margin: 14,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
  },

  statusText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },

  trackerCard: {
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  stepContainer: {
    alignItems: 'center',
    width: 90,
  },

  card: {
    marginHorizontal: 14,
    marginTop: 10,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },

  itemName: {
    fontSize: 14,
    fontWeight: '600',
  },

  itemQty: {
    fontSize: 12,
    color: '#777',
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
  },

  label: {
    fontSize: 12,
    color: '#777',
    marginTop: 8,
  },

  value: {
    fontSize: 14,
    marginTop: 2,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  rowLabel: {
    fontSize: 13,
    color: '#555',
  },

  rowValue: {
    fontSize: 13,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEE',
    marginVertical: 10,
  },

  invoiceBtn: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  invoiceText: {
    fontWeight: '600',
  },
});

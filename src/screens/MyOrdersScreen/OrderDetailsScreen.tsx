import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import HorizontalProgress from './HorizontalProgress';
import { useGetOrderDetailWithOrderIdQuery } from '../../ReduxToolKit/Api/accountPageApi';

const OrderDetailsScreen = ({ route }: any) => {
  const { orders } = route.params;

  const { data, isLoading, isError } = useGetOrderDetailWithOrderIdQuery({
    orderId: orders?.id,
  });

  const order = data?.data;

  const statusMap: any = {
    Recieved: 0,
    Confirmed: 0,
    Dispatched: 1,
    outForDelivery: 2,
    Delivered: 3,
    Cancelled: 1,
  };

  const steps = [
    { title: 'Order Confirmed' },
    { title: 'Dispatch' },
    { title: 'Out for Delivery' },
    { title: 'Delivered' },
  ];

  const currentStep = statusMap[order?.status] ?? 0;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loader}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (isError || !order) {
    return (
      <SafeAreaView style={styles.loader}>
        <Text>Failed to load order details</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
      <Header title="Order Details" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.statusCard}>
          <Text style={styles.statusText}>{order.subtitle}</Text>
          <HorizontalProgress steps={steps} currentStep={currentStep} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items in this order</Text>

          {order.items.map((item: any) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                </View>
              </View>

              <Text style={styles.itemPrice}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery details</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}>
            {order.address.houseVillage}, {order.address.areaStreet},{' '}
            {order.address.city} - {order.address.pincode}
          </Text>

          <Text style={styles.label}>Contact</Text>
          <Text style={styles.value}>
            {order.address.name} • {order.address.phone}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price details</Text>

          {order.items.map((item: any) => (
            <Row
              key={item.id}
              label={item.name}
              value={`₹${item.price} x ${item.quantity}`}
            />
          ))}

          <View style={styles.divider} />

          <Row label="Total amount" value={`₹${order.totalAmount}`} bold />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment</Text>

          <Text style={styles.value}>{order.paymentStatus?.toUpperCase()}</Text>

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

const Row = ({ label, value, bold }: any) => (
  <View style={styles.rowBetween}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={[styles.rowValue, bold && { fontWeight: '700' }]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusCard: {
    marginHorizontal: 16,
    marginTop: 12,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 18,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },

  statusText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
    color: '#0F172A',
  },

  card: {
    marginHorizontal: 16,
    marginTop: 14,
    padding: 18,
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginBottom: 4,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 14,
    color: '#0F172A',
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  itemImage: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },

  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },

  itemQty: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },

  label: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 10,
  },

  value: {
    fontSize: 14,
    marginTop: 4,
    color: '#0F172A',
    lineHeight: 20,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },

  rowLabel: {
    fontSize: 13,
    color: '#475569',
  },

  rowValue: {
    fontSize: 13,
    color: '#0F172A',
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 14,
  },

  invoiceBtn: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 14,
    backgroundColor: '#F8FAFC',
  },

  invoiceText: {
    fontWeight: '600',
    fontSize: 14,
    color: '#0F172A',
  },
});

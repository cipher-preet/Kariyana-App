// OrderSuccess.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../styles';

const OrderSuccess = ({ route, navigation }: any) => {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>Order Placed Successfully</Text>

      <Text style={styles.subtitle}>
        Your order has been confirmed
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>{order._id}</Text>

        <Text style={styles.label}>Amount Paid</Text>
        <Text style={styles.value}>₹{order.totalAmount}</Text>
      </View>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.primaryText}>Go to Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('OrderDetails', { orderId: order._id })
        }
      >
        <Text style={styles.secondary}>View Order Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },

  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 6,
    color: '#666',
  },

  card: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 12,
  },

  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
  },

  primaryBtn: {
    marginTop: 30,
    backgroundColor: Colors.success,
    padding: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },

  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },

  secondary: {
    marginTop: 14,
    color: Colors.success,
    fontWeight: '600',
  },
});
// OrderProcessing.tsx
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Colors } from '../../styles';

const OrderProcessing = ({ route, navigation }: any) => {
  const { orderId } = route.params;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`YOUR_API/order/${orderId}`);
        const data = await res.json();

        const status = data?.order?.status;

        if (status === 'paid') {
          clearInterval(interval);
          navigation.replace('OrderSuccess', { order: data.order });
        }

        if (status === 'failed') {
          clearInterval(interval);
          navigation.replace('PaymentFailed', { orderId });
        }
      } catch (err) {
        console.log(err);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={Colors.success} />

        <Text style={styles.title}>Processing Payment</Text>

        <Text style={styles.subtitle}>
          Please wait while we confirm your payment...
        </Text>

        <Text style={styles.subtle}>
          Do not press back or close the app
        </Text>
      </View>
    </View>
  );
};

export default OrderProcessing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },

  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
  },

  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.gray500,
    textAlign: 'center',
  },

  subtle: {
    marginTop: 12,
    fontSize: 12,
    color: '#999',
  },
});
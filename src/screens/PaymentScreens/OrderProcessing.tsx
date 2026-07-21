import React, { useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import {
  useGetOrderStatusQuery,
  useEmptyCartAfterCheckoutMutation,
} from '../../ReduxToolKit/Api/PaymentApi';
import { useSelector } from 'react-redux';

const OrderProcessing = ({ route, navigation }: any) => {
  const { orderId } = route.params;
  const user_Id = useSelector((state: any) => state.auth.userId);

  const hasNavigated = useRef(false);
  const attempts = useRef(0);

  const { data, error } = useGetOrderStatusQuery(
    { orderId },
    {
      pollingInterval: 2500,
    },
  );

  const [emptyCart] = useEmptyCartAfterCheckoutMutation();

  useEffect(() => {
    if (!data || hasNavigated.current) return;

    const status = data?.data?.status;

    console.log('Order status:', status);

    if (status === 'paid') {
      hasNavigated.current = true;
      emptyCart({ userId: user_Id });
      navigation.replace('OrderSuccess', { order: data.data });
      return;
    }

    if (status === 'failed') {
      hasNavigated.current = true;
      navigation.replace('PaymentFailed', { orderId });
      return;
    }

    attempts.current += 1;
    if (attempts.current > 10) {
      hasNavigated.current = true;
      navigation.replace('PaymentFailed', { orderId });
    }
  }, [data, emptyCart, navigation, orderId, user_Id]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={Colors.success} />

        <Text style={styles.title}>Processing Payment</Text>

        <Text style={styles.subtitle}>
          Please wait while we confirm your payment...
        </Text>

        <Text style={styles.subtle}>Do not press back or close the app</Text>

        {error && (
          <Text style={{ color: 'red', marginTop: 10 }}>
            Something went wrong...
          </Text>
        )}
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

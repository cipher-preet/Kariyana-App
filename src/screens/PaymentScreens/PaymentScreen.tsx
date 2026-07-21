// PaymentScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { Colors } from '../../styles';

import { useCreateOrderMutation } from '../../ReduxToolKit/Api/PaymentApi';
import CartCheckoutWrapper from '../Cart/CartCheckoutWrapper';
import { RazorpayOptions } from '../../types/razorpay';

type Method = 'upi' | 'card';

interface RouteParams {
  items: any[];
  userId: string;
  addressId: string;
  totalAmount: number;
}

const PaymentScreen = ({ route, navigation }: any) => {
  const { items, userId, addressId, totalAmount } = route.params as RouteParams;
  const formattedTotal = `\u20B9${totalAmount ?? 0}`;

  const [method, setMethod] = useState<Method>('upi');
  const [loading, setLoading] = useState(false);

  const [createOrder] = useCreateOrderMutation();

  const handlePayment = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await createOrder({
        userId,
        addressId,
        items,
      }).unwrap();

      const { order, razorpayOrder } = response.data;

      const options: RazorpayOptions = {
        key: 'rzp_test_SUG0Z9bvm5GqyU',
        amount: razorpayOrder.amount,
        currency: 'INR',
        order_id: razorpayOrder.id,

        name: 'AmbeMart',
        description: 'Order Payment',

        prefill: {
          contact: '9999999999',
          email: 'test@gmail.com',
        },

        theme: { color: '#22c55e' },
      };

      if (method === 'upi') {
        options.method = {
          upi: true,
          card: false,
          netbanking: false,
          wallet: false,
        };
        options.upi = { flow: 'intent' };
      } else {
        options.method = {
          card: true,
          upi: false,
          netbanking: false,
          wallet: false,
        };
      }

      RazorpayCheckout.open(options)
        .then(() => {
          navigation.replace('OrderProcessing', {
            orderId: order._id,
          });
        })
        .catch((err: any) => {
          console.log('Payment Failed:', err);

          navigation.replace('PaymentFailed', {
            orderId: order._id,
            message: err?.description || 'Payment failed',
          });
        });

      console.log('Razorpay:', RazorpayCheckout);
    } catch (err: any) {
      console.log('Create Order Error:', err);

      navigation.replace('PaymentFailed', {
        message: 'Unable to initiate payment',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartCheckoutWrapper
      title="Select Payment"
      onBackPress={() => navigation.goBack()}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Select Payment Method</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Cart Value</Text>
          <Text style={styles.summaryAmount}>{formattedTotal}</Text>
        </View>

        <TouchableOpacity
          style={[styles.card, method === 'upi' && styles.active]}
          onPress={() => setMethod('upi')}
          activeOpacity={0.8}
        >
          <Text style={styles.title}>UPI</Text>
          <Text style={styles.subtitle}>GPay • PhonePe • Paytm</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, method === 'card' && styles.active]}
          onPress={() => setMethod('card')}
          activeOpacity={0.8}
        >
          <Text style={styles.title}>Credit / Debit Card</Text>
          <Text style={styles.subtitle}>Visa • Mastercard • RuPay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.payBtn, loading && { opacity: 0.7 }]}
          onPress={handlePayment}
          disabled={loading}
        >
          <Text style={styles.payText}>
            {loading ? 'Processing...' : `Pay ${formattedTotal}`}
          </Text>
        </TouchableOpacity>
      </View>
    </CartCheckoutWrapper>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.white,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    color: Colors.gray900,
  },

  summaryCard: {
    backgroundColor: Colors.gray50,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
  },

  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray700,
    marginBottom: 6,
  },

  summaryAmount: {
    fontSize: 26,
    fontWeight: '600',
    color: Colors.gray900,
  },

  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginBottom: 12,
  },

  active: {
    borderColor: Colors.success,
    backgroundColor: Colors.success + '15',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray900,
  },

  subtitle: {
    fontSize: 12,
    color: Colors.gray500,
    marginTop: 4,
  },

  payBtn: {
    marginTop: 'auto',
    backgroundColor: Colors.success,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  payText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

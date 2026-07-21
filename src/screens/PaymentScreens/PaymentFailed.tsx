// PaymentFailed.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../styles';
import { CommonActions } from '@react-navigation/native';

const PaymentFailed = ({ route, navigation }: any) => {
  const { orderId } = route.params || {};

  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.icon}>✕</Text>
      </View>

      <Text style={styles.title}>Payment Failed</Text>

      <Text style={styles.subtitle}>
        {'Something went wrong while processing payment'}
      </Text>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() =>
          navigation.replace('PaymentScreen', {
            retryOrderId: orderId,
          })
        }
      >
        <Text style={styles.primaryText}>Retry Payment</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            }),
          );
        }}
      >
        <Text style={styles.secondary}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentFailed;

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
    backgroundColor: '#ef4444',
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
    marginTop: 8,
    color: '#666',
    textAlign: 'center',
  },

  primaryBtn: {
    marginTop: 24,
    backgroundColor: '#ef4444',
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

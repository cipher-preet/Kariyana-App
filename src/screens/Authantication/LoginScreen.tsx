import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Colors, Spacing, Radius } from '../../styles';
import { moderateScaleVertical } from '../../styles/responsiveStyles';

const LoginScreen = ({ navigation }: any) => {
  const { phone, setPhone, setConfirmation } = useAuth();
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (phone.length !== 10) return;

    try {
      setLoading(true);
      const authInstance = getAuth();
      const confirmationResult = await signInWithPhoneNumber(
        authInstance,
        `+91${phone}`,
      );

      setConfirmation(confirmationResult);
      navigation.navigate('OtpVerify');
    } catch (error) {
      console.log('OTP error:', error);
      Alert.alert('OTP Failed', 'Unable to send OTP. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.white}
        translucent={false}
      />

      <View style={styles.wrapper}>
        <View style={styles.brandWrapper}>
          <Image
            source={{
              uri: 'https://www.shutterstock.com/image-vector/shopping-food-basket-icon-isolated-260nw-2370040877.jpg',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brandTagline}>
            Wholesale prices for your shop
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome To Kariyana</Text>
          <Text style={styles.subtitle}>
            Login OR Register using your mobile number
          </Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor={Colors.gray400}
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            disabled={loading}
            onPress={sendOtp}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate('RegisterStep1')}
          ></TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  wrapper: {
    flex: 0.8,
    justifyContent: 'center',
  },

  brandWrapper: {
    alignItems: 'center',
    marginBottom: moderateScaleVertical(32),
  },

  logo: {
    height: 150,
    width: 160,
  },

  brandTagline: {
    fontSize: 13,
    color: Colors.gray600,
  },

  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: moderateScaleVertical(16),
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    backgroundColor: Colors.white,
  },

  prefix: {
    fontSize: 15,
    color: Colors.gray800,
    marginRight: 8,
    fontWeight: '500',
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray900,
  },

  button: {
    marginTop: Spacing.xl,
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  registerBtn: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },

  registerText: {
    fontSize: 14,
    color: Colors.gray600,
  },

  registerBold: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

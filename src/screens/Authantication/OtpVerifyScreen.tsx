import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
} from 'react-native';
import { Colors, Spacing, Radius } from '../../styles';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../context/AuthContext';

const OTP_LENGTH = 6;

const OtpVerifyScreen = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const { confirmation, phone, setConfirmation } = useAuth();

  //--------------------------------------------------------------------------------
  const verifyOtp = async () => {
    if (otp.length !== OTP_LENGTH) {
      Alert.alert('Invalid OTP');
      return;
    }

    if (!confirmation) {
      Alert.alert('Session expired. Please resend OTP.');
      return;
    }
    try {
      setLoading(true);
      await confirmation.confirm(otp);
      setLoading(false);
      Alert.alert('Login successful');
      // navigation.replace('Home'); // navigate to app
    } catch (error) {
      setLoading(false);
      Alert.alert('Invalid OTP');
    }
  };

  const resendOtp = async () => {
    try {
      setLoading(true);
      const newConfirmation = await auth().signInWithPhoneNumber(`+91${phone}`);
      setConfirmation(newConfirmation);
      setLoading(false);
      Alert.alert('OTP resent');
    } catch (error) {
      setLoading(false);
      Alert.alert('Failed to resend OTP');
    }
  };
  //----------------------------------------------------------------------------

  const renderBox = (_: any, index: number) => {
    const digit = otp[index] || '';
    const isActive = index === otp.length;

    return (
      <View key={index} style={[styles.otpBox, isActive && styles.activeBox]}>
        <Text style={styles.otpText}>{digit}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>OTP Verification</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your mobile number
          </Text>
        </View>

        <Pressable
          style={styles.otpRow}
          onPress={() => inputRef.current?.focus()}
        >
          {Array.from({ length: OTP_LENGTH }).map(renderBox)}
        </Pressable>

        <TextInput
          ref={inputRef}
          value={otp}
          onChangeText={text => {
            if (text.length <= OTP_LENGTH) {
              setOtp(text.replace(/[^0-9]/g, ''));
            }
          }}
          keyboardType="number-pad"
          maxLength={OTP_LENGTH}
          style={styles.hiddenInput}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={verifyOtp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.resend}
          activeOpacity={0.7}
          onPress={resendOtp}
          disabled={loading}
        >
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: Spacing.xxl,
  },

  header: {
    marginBottom: Spacing.xxl,
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
  },

 otpRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: Spacing.lg,
},


otpBox: {
  width: 52,
  height: 56,
  borderRadius: Radius.lg,
  borderWidth: 1.5,
  borderColor: Colors.gray300,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.white,
  marginHorizontal: 6, 
},


  activeBox: {
    borderColor: Colors.primary,
  },

  otpText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray900,
  },

  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },

  button: {
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
    letterSpacing: 0.3,
  },

  resend: {
    marginTop: Spacing.lg,
    alignItems: 'center',
  },

  resendText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
  },
});

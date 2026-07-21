import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, Radius } from '../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveStyles';
import { useSendOtpMutation } from '../../ReduxToolKit/Api/authApi';
import { getApiErrorMessage } from '../../utils/apiError';

const LoginScreen = ({ navigation }: any) => {
  const { phone, setPhone } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sendOtpRequest] = useSendOtpMutation();
  const isPhoneValid = phone.length === 10;

  const sendOtp = async () => {
    if (!isPhoneValid) {
      Alert.alert('Invalid number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      setLoading(true);
      await sendOtpRequest({ phone }).unwrap();
      navigation.navigate('OtpVerify');
    } catch (error) {
      console.log('OTP error:', error);
      Alert.alert('OTP Failed', getApiErrorMessage(error, 'Try again later'));
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
        backgroundColor={styles.container.backgroundColor}
        translucent={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroArea}>
          <View style={styles.greenOrb} />
          <View style={styles.orangeOrb} />
          <View style={styles.deepCurve} />
          <View style={styles.phonePreview}>
            <View style={styles.previewNotch} />
            <View style={styles.previewLineShort} />
            <View style={styles.previewLine} />
            <View style={styles.previewInput} />
            <View style={styles.previewButton} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.eyebrow}>Kariyana partner access</Text>
          <Text style={styles.title}>Sign in to continue</Text>
          <Text style={styles.subtitle}>
            Enter your mobile number and we will send a secure OTP.
          </Text>

          <Text style={styles.label}>Mobile number</Text>
          <View style={[styles.inputWrapper, isPhoneValid && styles.inputActive]}>
            <Text style={styles.prefix}>+91</Text>
            <View style={styles.divider} />
            <TextInput
              placeholder="Enter mobile number"
              placeholderTextColor={Colors.gray400}
              keyboardType="number-pad"
              maxLength={10}
              value={phone}
              onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.82}
            style={[
              styles.button,
              (!isPhoneValid || loading) && styles.buttonDisabled,
            ]}
            disabled={loading}
            onPress={sendOtp}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerText}>
            New to Kariyana? Verification will guide you to registration.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: moderateScaleVertical(32),
  },

  heroArea: {
    minHeight: moderateScaleVertical(292),
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    overflow: 'hidden',
  },

  greenOrb: {
    position: 'absolute',
    top: moderateScaleVertical(48),
    left: moderateScale(42),
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: '#0F5A20',
  },

  orangeOrb: {
    position: 'absolute',
    right: moderateScale(46),
    bottom: moderateScaleVertical(28),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.secondary,
  },

  deepCurve: {
    position: 'absolute',
    width: moderateScale(390),
    height: moderateScale(390),
    borderRadius: moderateScale(195),
    backgroundColor: '#124F20',
    right: moderateScale(-142),
    bottom: moderateScaleVertical(-126),
    opacity: 0.96,
  },

  phonePreview: {
    alignSelf: 'flex-end',
    width: moderateScale(166),
    minHeight: moderateScaleVertical(218),
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    padding: moderateScale(18),
    marginRight: moderateScale(10),
    marginBottom: moderateScaleVertical(8),
    shadowColor: Colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },

  previewNotch: {
    width: moderateScale(38),
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray200,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(28),
  },

  previewLineShort: {
    width: '58%',
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.gray800,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(8),
  },

  previewLine: {
    width: '74%',
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray200,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(22),
  },

  previewInput: {
    height: moderateScaleVertical(34),
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
    marginBottom: moderateScaleVertical(16),
  },

  previewButton: {
    height: moderateScaleVertical(36),
    borderRadius: Radius.lg,
    backgroundColor: '#0F5A20',
  },

  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: moderateScaleVertical(18),
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondaryDark,
    textTransform: 'uppercase',
    marginBottom: moderateScaleVertical(10),
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.gray900,
    marginBottom: moderateScaleVertical(8),
  },

  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    lineHeight: 21,
    marginBottom: moderateScaleVertical(30),
    maxWidth: '88%',
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: moderateScaleVertical(8),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: moderateScaleVertical(56),
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.xl,
    paddingHorizontal: moderateScale(16),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  inputActive: {
    borderColor: '#0F5A20',
  },

  prefix: {
    fontSize: 15,
    color: Colors.gray800,
    fontWeight: '700',
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.gray200,
    marginHorizontal: moderateScale(12),
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.gray900,
  },

  button: {
    marginTop: moderateScaleVertical(24),
    height: moderateScaleVertical(56),
    borderRadius: Radius.xl,
    backgroundColor: '#0F5A20',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F5A20',
    shadowOpacity: 0.26,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.62,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },

  footerText: {
    marginTop: moderateScaleVertical(18),
    fontSize: 12,
    lineHeight: 18,
    color: Colors.gray500,
    textAlign: 'center',
  },
});

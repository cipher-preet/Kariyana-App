import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Spacing, Radius } from '../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveStyles';
import { useAuth } from '../../context/AuthContext';
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from '../../ReduxToolKit/Api/authApi';
import { setUser } from '../../ReduxToolKit/Slices/authslice';
import { getApiErrorMessage } from '../../utils/apiError';
import AppAlert, {
  AppAlertState,
  createHiddenAlert,
} from '../../components/common/AppAlert';
import { SmsUserConsent } from '../../native/SmsUserConsent';

const OTP_LENGTH = 6;

const OtpVerifyScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const [verifyOtpRequest] = useVerifyOtpMutation();
  const [sendOtpRequest] = useSendOtpMutation();

  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<AppAlertState>(createHiddenAlert());
  const [autoDetecting, setAutoDetecting] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const autoSubmittedOtpRef = useRef<string | null>(null);

  const { phone } = useAuth();

  //--------------------------------------------------------------------------------
  const verifyOtp = useCallback(async (otpValue = otp) => {
    if (otpValue.length !== 6 || phone.length !== 10) {
      setAlert({
        visible: true,
        title: 'Invalid OTP',
        message: 'Please enter the complete 6-digit OTP.',
        variant: 'warning',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await verifyOtpRequest({ phone, otp: otpValue }).unwrap();

      dispatch(setUser(res.data.userId));
      await AsyncStorage.setItem('userId', res.data.userId);
      await SmsUserConsent.clearLastOtp();
      await SmsUserConsent.stopListening();

      switch (res.data.nextScreen) {
        case 'APPROVED':
          navigation.reset({ index: 0, routes: [{ name: 'App' }] });
          break;

        case 'REGISTER':
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth', params: { screen: 'RegisterStep1' } }],
          });
          break;

        case 'PENDING':
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth', params: { screen: 'RegisterSuccess' } }],
          });
          break;

        default:
          navigation.reset({ index: 0, routes: [{ name: 'Auth' }] });
      }
    } catch (err: any) {
      setAlert({
        visible: true,
        title: 'Login failed',
        message: getApiErrorMessage(err, 'Try again'),
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [dispatch, navigation, otp, phone, verifyOtpRequest]);

  const handleDetectedOtp = useCallback(
    (detectedOtp?: string | null) => {
      if (!detectedOtp || detectedOtp.length !== OTP_LENGTH) return;
      if (autoSubmittedOtpRef.current === detectedOtp) return;

      autoSubmittedOtpRef.current = detectedOtp;
      setOtp(detectedOtp);
      verifyOtp(detectedOtp);
    },
    [verifyOtp],
  );

  useEffect(() => {
    let mounted = true;
    const subscription = SmsUserConsent.addOtpListener(payload => {
      handleDetectedOtp(payload.otp);
    });

    const startOtpListener = async () => {
      try {
        setAutoDetecting(true);
        const cached = await SmsUserConsent.getLastOtp();
        if (mounted) {
          handleDetectedOtp(cached.otp);
        }

        await SmsUserConsent.startListening(null);
      } catch (error) {
        console.log('SMS consent listener error:', error);
      } finally {
        if (mounted) {
          setAutoDetecting(false);
        }
      }
    };

    startOtpListener();

    return () => {
      mounted = false;
      subscription?.remove();
      SmsUserConsent.stopListening().catch(() => {});
    };
  }, [handleDetectedOtp]);

  const resendOtp = async () => {
    try {
      setLoading(true);
      autoSubmittedOtpRef.current = null;
      await SmsUserConsent.clearLastOtp();
      await SmsUserConsent.startListening(null);
      await sendOtpRequest({ phone }).unwrap();
      setAlert({
        visible: true,
        title: 'OTP resent',
        message: 'A fresh verification code has been sent.',
        variant: 'success',
      });
    } catch (error) {
      setAlert({
        visible: true,
        title: 'Failed to resend OTP',
        message: getApiErrorMessage(error, 'Try again later'),
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  //----------------------------------------------------------------------------

  const renderBox = (_: any, index: number) => {
    const digit = otp[index] || '';
    const isActive = index === otp.length;
    const isFilled = Boolean(digit);

    return (
      <View
        key={index}
        style={[
          styles.otpBox,
          isFilled && styles.filledBox,
          isActive && styles.activeBox,
        ]}
      >
        <Text style={styles.otpText}>{digit}</Text>
      </View>
    );
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
          <View style={styles.deepCurve} />
          <View style={styles.greenOrb} />
          <View style={styles.orangeOrb} />
          <View style={styles.codePreview}>
            <View style={styles.previewNotch} />
            <View style={styles.previewTitle} />
            <View style={styles.previewSubtitle} />
            <View style={styles.previewDotsRow}>
              <View style={styles.previewDot} />
              <View style={styles.previewDot} />
              <View style={styles.previewDot} />
              <View style={styles.previewDot} />
            </View>
            <View style={styles.previewButton} />
          </View>
        </View>

        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.72}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.eyebrow}>Verify mobile number</Text>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            We sent a 6-digit code to +91 {phone || 'your mobile number'}.
          </Text>

          {SmsUserConsent.isAvailable ? (
            <Text style={styles.autoReadText}>
              {autoDetecting
                ? 'Listening for OTP message...'
                : 'OTP will auto-fill after SMS permission.'}
            </Text>
          ) : null}

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
            style={[
              styles.button,
              (otp.length !== OTP_LENGTH || loading) && styles.buttonDisabled,
            ]}
            activeOpacity={0.86}
            onPress={() => verifyOtp()}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.72}
              onPress={resendOtp}
              disabled={loading}
            >
              <Text style={styles.actionText}>Resend code</Text>
            </TouchableOpacity>

            <View style={styles.actionDivider} />

            <TouchableOpacity
              style={styles.actionButton}
              activeOpacity={0.72}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={styles.actionText}>Change number</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <AppAlert
        {...alert}
        onClose={() => setAlert(createHiddenAlert())}
      />
    </KeyboardAvoidingView>
  );
};

export default OtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: moderateScaleVertical(34),
  },

  heroArea: {
    minHeight: moderateScaleVertical(276),
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    overflow: 'hidden',
  },

  deepCurve: {
    position: 'absolute',
    width: moderateScale(420),
    height: moderateScale(420),
    borderRadius: moderateScale(210),
    backgroundColor: '#124F20',
    left: moderateScale(-142),
    bottom: moderateScaleVertical(-164),
    opacity: 0.96,
  },

  greenOrb: {
    position: 'absolute',
    right: moderateScale(48),
    top: moderateScaleVertical(56),
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: '#0F5A20',
  },

  orangeOrb: {
    position: 'absolute',
    left: moderateScale(58),
    bottom: moderateScaleVertical(28),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.secondary,
  },

  codePreview: {
    width: moderateScale(178),
    minHeight: moderateScaleVertical(210),
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    padding: moderateScale(18),
    marginLeft: moderateScale(22),
    marginBottom: moderateScaleVertical(10),
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
    marginBottom: moderateScaleVertical(30),
  },

  previewTitle: {
    width: '62%',
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.gray800,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(8),
  },

  previewSubtitle: {
    width: '78%',
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray200,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(22),
  },

  previewDotsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScaleVertical(22),
  },

  previewDot: {
    width: moderateScale(26),
    height: moderateScale(28),
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
  },

  previewButton: {
    height: moderateScaleVertical(34),
    borderRadius: Radius.lg,
    backgroundColor: '#0F5A20',
  },

  content: {
    paddingHorizontal: Spacing.xl,
    paddingTop: moderateScaleVertical(18),
  },

  backButton: {
    alignSelf: 'flex-start',
    minHeight: moderateScaleVertical(36),
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(12),
  },

  backText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray700,
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
    marginBottom: moderateScaleVertical(10),
    maxWidth: '90%',
  },

  autoReadText: {
    fontSize: 12,
    lineHeight: 17,
    color: '#0F5A20',
    fontWeight: '700',
    marginBottom: moderateScaleVertical(20),
  },

  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: moderateScale(-4),
    marginBottom: moderateScaleVertical(10),
  },

  otpBox: {
    flex: 1,
    aspectRatio: 0.92,
    maxWidth: moderateScale(50),
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: moderateScale(4),
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  filledBox: {
    backgroundColor: Colors.gray50,
  },

  activeBox: {
    borderColor: '#0F5A20',
    borderWidth: 1.5,
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
    height: moderateScaleVertical(56),
    borderRadius: Radius.xl,
    backgroundColor: '#0F5A20',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(24),
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

  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScaleVertical(18),
  },

  actionButton: {
    minHeight: moderateScaleVertical(34),
    justifyContent: 'center',
    paddingHorizontal: moderateScale(8),
  },

  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F5A20',
  },

  actionDivider: {
    width: 1,
    height: 16,
    backgroundColor: Colors.gray300,
    marginHorizontal: moderateScale(8),
  },
});

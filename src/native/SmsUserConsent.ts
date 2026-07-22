import {
  NativeEventEmitter,
  NativeModules,
  Platform,
  type EmitterSubscription,
} from 'react-native';

type SmsUserConsentPayload = {
  otp?: string | null;
  message?: string | null;
  status?: string | null;
};

type SmsUserConsentModule = {
  startListening: (senderAddress?: string | null) => Promise<boolean>;
  stopListening: () => Promise<boolean>;
  getLastOtp: () => Promise<SmsUserConsentPayload>;
  clearLastOtp: () => Promise<boolean>;
};

const nativeModule = NativeModules.SmsUserConsent as
  | SmsUserConsentModule
  | undefined;

const emitter = nativeModule ? new NativeEventEmitter(nativeModule as any) : null;

export const SmsUserConsent = {
  isAvailable: Platform.OS === 'android' && Boolean(nativeModule),

  startListening(senderAddress?: string | null) {
    if (!SmsUserConsent.isAvailable) return Promise.resolve(false);
    return nativeModule!.startListening(senderAddress ?? null);
  },

  stopListening() {
    if (!SmsUserConsent.isAvailable) return Promise.resolve(false);
    return nativeModule!.stopListening();
  },

  getLastOtp() {
    if (!SmsUserConsent.isAvailable) {
      return Promise.resolve({ otp: null, message: null, status: null });
    }

    return nativeModule!.getLastOtp();
  },

  clearLastOtp() {
    if (!SmsUserConsent.isAvailable) return Promise.resolve(false);
    return nativeModule!.clearLastOtp();
  },

  addOtpListener(
    listener: (payload: SmsUserConsentPayload) => void,
  ): EmitterSubscription | null {
    if (!emitter) return null;
    return emitter.addListener('SmsUserConsent:onOtp', listener);
  },
};

export type { SmsUserConsentPayload };

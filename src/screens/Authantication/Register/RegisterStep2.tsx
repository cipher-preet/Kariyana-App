import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AuthContainer from '../../../components/common/AuthWrapper';
import StepIndicator from '../../Authantication/Register/StepIndicator';
import { Colors, Spacing, Radius } from '../../../styles';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../ReduxToolKit/Rtk/store';
import { updateDraft } from '../../../ReduxToolKit/Slices/registerDraftSlice';

const SHOP_TYPES = [
  'Grocery',
  'Medical',
  'Vegetable',
  'Clothing',
  'Electronics',
  'Hardware',
  'Dairy',
  'Other',
];

const RegisterStep2 = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [focused, setFocused] = useState<string | null>(null);
  const [shopType, setShopType] = useState<string | null>(null);
  const [shopImage, setShopImage] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string | ''>('');

  console.log('this is shop type ', shopType);
  console.log('this is shop image ', shopImage);
  console.log('this is shop image ', shopName);

  const renderInput = (
    label: string,
    field: string,
    value: string,
    onChangeText: (text: string) => void,
    multiline = false,
  ) => (
    <View
      style={[styles.inputCard, focused === field && styles.inputCardFocused]}
    >
      <Text
        style={[
          styles.inputLabel,
          focused === field && styles.inputLabelFocused,
        ]}
      >
        {label}
      </Text>

      <TextInput
        style={styles.textInput}
        onFocus={() => setFocused(field)}
        onBlur={() => setFocused(null)}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );

  const openCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message:
            'We need camera access to take a photo of your shop for verification',
          buttonPositive: 'Allow',
          buttonNegative: 'Cancel',
        },
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          'Permission Required',
          'Please allow camera access from app settings',
        );
        return;
      }
    }

    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 0.7,
        saveToPhotos: false,
      },
      response => {
        if (response.didCancel) return;

        if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
          return;
        }

        if (response.assets?.length) {
          setShopImage(response.assets[0].uri || null);
        }
      },
    );
  };

  const handleContinue = () => {
  dispatch(
    updateDraft({
      shopName,
      Type: shopType || '',
      shopPhotos: shopImage,
    })
  );

  navigation.navigate('RegisterStep3');
};

  return (
    <AuthContainer scrollable contentPadding={0}>
      <View style={styles.header}>
        <StepIndicator step={2} total={3} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Shop Details</Text>
        <Text style={styles.subtitle}>
          Help customers identify your shop easily
        </Text>

        <View style={styles.formCard}>
          {renderInput('Shop Name', 'shopName', shopName, setShopName)}

          {/* SHOP TYPE */}
          <Text style={styles.sectionTitle}>Type of Shop</Text>
          <View style={styles.chipWrap}>
            {SHOP_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, shopType === type && styles.chipActive]}
                onPress={() => setShopType(type)}
              >
                <Text
                  style={[
                    styles.chipText,
                    shopType === type && styles.chipTextActive,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.uploadCard}
            activeOpacity={0.85}
            onPress={openCamera}
          >
            {shopImage ? (
              <Image source={{ uri: shopImage }} style={styles.shopImage} />
            ) : (
              <>
                <Text style={styles.uploadTitle}>Take Shop Photo</Text>
                <Text style={styles.uploadSubtitle}>
                  Front view with board visible
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleContinue}
        >
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RegisterStep2;


const styles = StyleSheet.create({
  header: { alignItems: 'center' },

  body: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.gray900,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: Colors.gray600,
    marginBottom: Spacing.xl,
  },

  formCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    elevation: 6,
  },

  inputCard: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.lg,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
    backgroundColor: Colors.gray50,
    marginBottom: Spacing.lg,
  },

  inputCardFocused: {
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },

  inputLabel: {
    fontSize: 14,
    color: Colors.gray500,
    marginBottom: 6,
  },

  inputLabelFocused: {
    color: Colors.primary,
    fontWeight: '600',
  },

  textInput: {
    fontSize: 16,
    color: Colors.gray900,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: Spacing.sm,
  },

  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },

  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    backgroundColor: Colors.gray100,
    marginRight: 8,
    marginBottom: 8,
  },

  chipActive: {
    backgroundColor: Colors.primary,
  },

  chipText: {
    fontSize: 13,
    color: Colors.gray700,
  },

  chipTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },

  uploadCard: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.gray300,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: Colors.gray50,
  },

  uploadTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.gray800,
  },

  uploadSubtitle: {
    fontSize: 12,
    color: Colors.gray500,
    marginTop: 4,
  },

  shopImage: {
    width: '100%',
    height: 160,
    borderRadius: Radius.lg,
  },

  primaryButton: {
    height: 58,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
});

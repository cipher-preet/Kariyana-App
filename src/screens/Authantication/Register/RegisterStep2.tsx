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
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, Radius } from '../../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveStyles';

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

  const renderInput = (
    label: string,
    field: string,
    value: string,
    onChangeText: (text: string) => void,
  ) => (
    <View
      style={[styles.inputWrap, focused === field && styles.inputWrapFocused]}
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
      }),
    );

    navigation.navigate('RegisterStep3');
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
          <View style={styles.shopPreview}>
            <View style={styles.previewAwning} />
            <View style={styles.previewLineShort} />
            <View style={styles.previewLine} />
            <View style={styles.previewInput} />
            <View style={styles.previewChips}>
              <View style={styles.previewChipActive} />
              <View style={styles.previewChip} />
            </View>
            <View style={styles.previewButton} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.stepRow}>
            <View style={styles.stepDotDone} />
            <View style={styles.stepDotActive} />
            <View style={styles.stepDot} />
            <Text style={styles.stepText}>Step 2 of 3</Text>
          </View>

          <Text style={styles.eyebrow}>Set up your shop</Text>
          <Text style={styles.title}>Shop details</Text>
          <Text style={styles.subtitle}>
            Help buyers recognize your store and category quickly.
          </Text>

          {renderInput('Shop name', 'shopName', shopName, setShopName)}

          <Text style={styles.sectionTitle}>Type of shop</Text>
          <View style={styles.chipWrap}>
            {SHOP_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                activeOpacity={0.78}
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
                <Text style={styles.uploadTitle}>Take shop photo</Text>
                <Text style={styles.uploadSubtitle}>
                  Front view with board visible
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.86}
            style={styles.primaryButton}
            onPress={handleContinue}
          >
            <Text style={styles.primaryButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterStep2;


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
    minHeight: moderateScaleVertical(270),
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
    bottom: moderateScaleVertical(30),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.secondary,
  },

  shopPreview: {
    width: moderateScale(178),
    minHeight: moderateScaleVertical(214),
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

  previewAwning: {
    height: moderateScaleVertical(34),
    borderTopLeftRadius: Radius.md,
    borderTopRightRadius: Radius.md,
    backgroundColor: Colors.gray100,
    marginBottom: moderateScaleVertical(18),
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
    width: '76%',
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray200,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(16),
  },

  previewInput: {
    height: moderateScaleVertical(30),
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
    marginBottom: moderateScaleVertical(12),
  },

  previewChips: {
    flexDirection: 'row',
    marginBottom: moderateScaleVertical(14),
  },

  previewChipActive: {
    width: moderateScale(42),
    height: moderateScaleVertical(20),
    borderRadius: Radius.full,
    backgroundColor: '#0F5A20',
    marginRight: moderateScale(8),
  },

  previewChip: {
    width: moderateScale(34),
    height: moderateScaleVertical(20),
    borderRadius: Radius.full,
    backgroundColor: Colors.gray100,
  },

  previewButton: {
    height: moderateScaleVertical(30),
    borderRadius: Radius.lg,
    backgroundColor: '#0F5A20',
  },

  body: {
    paddingHorizontal: Spacing.xl,
    paddingTop: moderateScaleVertical(18),
    paddingBottom: Spacing.xl,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScaleVertical(16),
  },

  stepDotDone: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: Radius.full,
    backgroundColor: '#0F5A20',
    marginRight: moderateScale(8),
  },

  stepDotActive: {
    width: moderateScale(24),
    height: moderateScale(8),
    borderRadius: Radius.full,
    backgroundColor: '#0F5A20',
    marginRight: moderateScale(8),
  },

  stepDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: Radius.full,
    backgroundColor: Colors.gray300,
    marginRight: moderateScale(8),
  },

  stepText: {
    marginLeft: moderateScale(4),
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray500,
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
    marginBottom: moderateScaleVertical(28),
    maxWidth: '90%',
  },

  inputWrap: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.xl,
    paddingHorizontal: moderateScale(16),
    paddingTop: moderateScaleVertical(12),
    paddingBottom: moderateScaleVertical(10),
    backgroundColor: Colors.white,
    marginBottom: moderateScaleVertical(18),
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  inputWrapFocused: {
    borderColor: '#0F5A20',
    backgroundColor: Colors.white,
  },

  inputLabel: {
    fontSize: 13,
    color: Colors.gray500,
    marginBottom: moderateScaleVertical(6),
  },

  inputLabelFocused: {
    color: '#0F5A20',
    fontWeight: '700',
  },

  textInput: {
    fontSize: 16,
    color: Colors.gray900,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray800,
    marginBottom: moderateScaleVertical(10),
  },

  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: moderateScaleVertical(16),
  },

  chip: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(14),
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginRight: moderateScale(8),
    marginBottom: moderateScaleVertical(8),
  },

  chipActive: {
    backgroundColor: '#0F5A20',
    borderColor: '#0F5A20',
  },

  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray700,
  },

  chipTextActive: {
    color: Colors.white,
    fontWeight: '600',
  },

  uploadCard: {
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0F5A20',
    paddingVertical: moderateScaleVertical(22),
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginBottom: moderateScaleVertical(24),
  },

  uploadTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray800,
  },

  uploadSubtitle: {
    fontSize: 12,
    color: Colors.gray500,
    marginTop: 4,
  },

  shopImage: {
    width: '100%',
    height: moderateScaleVertical(160),
    borderRadius: Radius.lg,
  },

  primaryButton: {
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

  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});

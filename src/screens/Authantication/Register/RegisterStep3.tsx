import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors, Radius, Spacing } from '../../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveStyles';
import { useRegisterShopMutation } from '../../../ReduxToolKit/Api/authApi';
import type { AppDispatch, RootState } from '../../../ReduxToolKit/Rtk/store';
import { clearDraft } from '../../../ReduxToolKit/Slices/registerDraftSlice';

const RegisterStep3 = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const registerDraft = useSelector((state: RootState) => state.registerDraft);
  const [registerShop, { isLoading }] = useRegisterShopMutation();

  const [focused, setFocused] = useState<string | null>(null);
  const [shopAge, setShopAge] = useState<string | null>(null);
  const [dailySales, setDailySales] = useState<string | null>(null);
  const [monthlySales, setMonthlySales] = useState<string | null>(null);
  const [gst, setGst] = useState('');

  const renderInput = (
    label: string,
    field: string,
    value: string,
    onChangeText: (text: string) => void,
  ) => (
    <View style={[styles.inputWrap, focused === field && styles.inputWrapFocused]}>
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
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(field)}
        onBlur={() => setFocused(null)}
      />
    </View>
  );

  const renderOptions = (
    title: string,
    options: string[],
    value: string | null,
    onSelect: (val: string) => void,
  ) => (
    <View style={styles.optionGroup}>
      <Text style={styles.optionTitle}>{title}</Text>

      <View style={styles.optionWrap}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt}
            activeOpacity={0.78}
            style={[
              styles.optionChip,
              value === opt && styles.optionChipActive,
            ]}
            onPress={() => onSelect(opt)}
          >
            <Text
              style={[
                styles.optionText,
                value === opt && styles.optionTextActive,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const handleFinish = async () => {
    try {
      const formData = new FormData();

      formData.append('name', registerDraft.name);
      formData.append('dateofbirth', registerDraft.dateofbirth);
      formData.append('address', registerDraft.address);
      formData.append('shopName', registerDraft.shopName);
      formData.append('Type', registerDraft.Type);

      if (registerDraft.shopPhotos) {
        formData.append('shopPhotos', {
          uri: registerDraft.shopPhotos,
          name: 'shop.jpg',
          type: 'image/jpeg',
        } as any);
      }

      if (gst) formData.append('gstNumber', gst);
      if (shopAge) formData.append('tenureOfShop', shopAge);
      if (dailySales) formData.append('Dsale', dailySales);
      if (monthlySales) formData.append('Msales', monthlySales);

      await registerShop(formData).unwrap();

      dispatch(clearDraft());
      navigation.reset({
        index: 0,
        routes: [{ name: 'RegisterSuccess' }],
      });
    } catch (error) {
      console.error('Registration failed:', error);
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
          <View style={styles.profilePreview}>
            <View style={styles.previewChartRow}>
              <View style={styles.previewBarSmall} />
              <View style={styles.previewBarMedium} />
              <View style={styles.previewBarTall} />
            </View>
            <View style={styles.previewLineShort} />
            <View style={styles.previewLine} />
            <View style={styles.previewInput} />
            <View style={styles.previewButton} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.stepRow}>
            <View style={styles.stepDotDone} />
            <View style={styles.stepDotDone} />
            <View style={styles.stepDotActive} />
            <Text style={styles.stepText}>Step 3 of 3</Text>
          </View>

          <Text style={styles.eyebrow}>Complete your shop</Text>
          <Text style={styles.title}>Shop profile</Text>
          <Text style={styles.subtitle}>
            Optional details help us verify and understand your business.
          </Text>

          {renderInput('GST number (optional)', 'gst', gst, setGst)}

          {renderOptions(
            'How long have you been running this shop?',
            ['Less than 1 year', '1-3 years', '3-5 years', '5+ years'],
            shopAge,
            setShopAge,
          )}

          {renderOptions(
            'Average daily sales (approx)',
            [
              'Below Rs 1,000',
              'Rs 1,000 - Rs 3,000',
              'Rs 3,000 - Rs 5,000',
              'Above Rs 5,000',
            ],
            dailySales,
            setDailySales,
          )}

          {renderOptions(
            'Average monthly sales (optional)',
            [
              'Below Rs 30,000',
              'Rs 30,000 - Rs 1 lakh',
              'Rs 1 - Rs 3 lakh',
              'Above Rs 3 lakh',
            ],
            monthlySales,
            setMonthlySales,
          )}

          <TouchableOpacity
            activeOpacity={0.86}
            style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
            disabled={isLoading}
            onPress={handleFinish}
          >
            {isLoading ? (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={Colors.white} size="small" />
                <Text style={[styles.primaryButtonText, styles.loadingText]}>
                  Registering...
                </Text>
              </View>
            ) : (
              <Text style={styles.primaryButtonText}>Finish Registration</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterStep3;

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

  greenOrb: {
    position: 'absolute',
    top: moderateScaleVertical(52),
    left: moderateScale(44),
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: '#0F5A20',
  },

  orangeOrb: {
    position: 'absolute',
    right: moderateScale(48),
    bottom: moderateScaleVertical(30),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.secondary,
  },

  deepCurve: {
    position: 'absolute',
    width: moderateScale(400),
    height: moderateScale(400),
    borderRadius: moderateScale(200),
    backgroundColor: '#124F20',
    right: moderateScale(-150),
    bottom: moderateScaleVertical(-150),
    opacity: 0.96,
  },

  profilePreview: {
    alignSelf: 'flex-end',
    width: moderateScale(178),
    minHeight: moderateScaleVertical(214),
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    padding: moderateScale(18),
    marginRight: moderateScale(10),
    marginBottom: moderateScaleVertical(10),
    shadowColor: Colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },

  previewChartRow: {
    height: moderateScaleVertical(54),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: moderateScaleVertical(18),
  },

  previewBarSmall: {
    width: moderateScale(18),
    height: moderateScaleVertical(28),
    borderRadius: Radius.sm,
    backgroundColor: Colors.gray100,
    marginHorizontal: moderateScale(4),
  },

  previewBarMedium: {
    width: moderateScale(18),
    height: moderateScaleVertical(40),
    borderRadius: Radius.sm,
    backgroundColor: Colors.secondary,
    marginHorizontal: moderateScale(4),
  },

  previewBarTall: {
    width: moderateScale(18),
    height: moderateScaleVertical(52),
    borderRadius: Radius.sm,
    backgroundColor: '#0F5A20',
    marginHorizontal: moderateScale(4),
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
    marginBottom: moderateScaleVertical(18),
  },

  previewInput: {
    height: moderateScaleVertical(32),
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
    marginBottom: moderateScaleVertical(14),
  },

  previewButton: {
    height: moderateScaleVertical(32),
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

  optionGroup: {
    marginBottom: moderateScaleVertical(18),
  },

  optionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.gray800,
    lineHeight: 20,
    marginBottom: moderateScaleVertical(10),
  },

  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  optionChip: {
    paddingVertical: moderateScaleVertical(10),
    paddingHorizontal: moderateScale(14),
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
    marginRight: moderateScale(8),
    marginBottom: moderateScaleVertical(8),
  },

  optionChipActive: {
    backgroundColor: '#0F5A20',
    borderColor: '#0F5A20',
  },

  optionText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray700,
  },

  optionTextActive: {
    color: Colors.white,
    fontWeight: '700',
  },

  primaryButton: {
    height: moderateScaleVertical(56),
    borderRadius: Radius.xl,
    backgroundColor: '#0F5A20',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(6),
    shadowColor: '#0F5A20',
    shadowOpacity: 0.26,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  loadingText: {
    marginLeft: moderateScale(8),
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
});

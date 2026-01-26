import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AuthContainer from '../../../components/common/AuthWrapper';
import StepIndicator from '../../Authantication/Register/StepIndicator';
import { Colors, Spacing, Radius } from '../../../styles';
import { ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../ReduxToolKit/Rtk/store';
import {
  updateDraft,
  clearDraft,
} from '../../../ReduxToolKit/Slices/registerDraftSlice';
import { useRegisterShopMutation } from '../../../ReduxToolKit/Api/authApi';

const RegisterStep3 = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const registerDraft = useSelector((state: RootState) => state.registerDraft);

  const [registerShop, { isLoading }] = useRegisterShopMutation();

  const [focused, setFocused] = useState<string | null>(null);
  const [shopAge, setShopAge] = useState<string | null>(null);
  const [dailySales, setDailySales] = useState<string | null>(null);
  const [monthlySales, setMonthlySales] = useState<string | null>(null);
  const [gst, setGst] = useState('');

  console.log(shopAge);
  console.log(dailySales);
  console.log(monthlySales);
  console.log(gst);

  const renderInput = (
    label: string,
    field: string,
    value: string,
    onChangeText: (text: string) => void,
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

      const response = await registerShop(formData).unwrap();

      console.log(response);

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
    <AuthContainer scrollable contentPadding={0}>
      <View style={styles.header}>
        <StepIndicator step={3} total={3} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Shop Profile</Text>
        <Text style={styles.subtitle}>
          Optional – helps customers trust your shop more
        </Text>

        <View style={styles.formCard}>
          {renderInput('GST Number (optional)', 'gst', gst, setGst)}

          {renderOptions(
            'How long have you been running this shop?',
            ['Less than 1 year', '1–3 years', '3–5 years', '5+ years'],
            shopAge,
            setShopAge,
          )}

          {renderOptions(
            'Average daily sales (approx)',
            [
              'Below ₹1,000',
              '₹1,000 – ₹3,000',
              '₹3,000 – ₹5,000',
              'Above ₹5,000',
            ],
            dailySales,
            setDailySales,
          )}

          {renderOptions(
            'Average monthly sales (optional)',
            [
              'Below ₹30,000',
              '₹30,000 – ₹1 lakh',
              '₹1 – ₹3 lakh',
              'Above ₹3 lakh',
            ],
            monthlySales,
            setMonthlySales,
          )}
        </View>

        <TouchableOpacity
          style={[styles.primaryButton, isLoading && { opacity: 0.7 }]}
          disabled={isLoading}
          onPress={handleFinish}
        >
          {isLoading ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ActivityIndicator color="#fff" size="small" />
              <Text style={[styles.primaryButtonText, { marginLeft: 8 }]}>
                Registering…
              </Text>
            </View>
          ) : (
            <Text style={styles.primaryButtonText}>Finish Registration</Text>
          )}
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RegisterStep3;

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
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
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

  optionGroup: {
    marginBottom: Spacing.xl,
  },

  optionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray800,
    marginBottom: Spacing.sm,
  },

  optionWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  optionChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: Radius.lg,
    backgroundColor: Colors.gray100,
    marginRight: 8,
    marginBottom: 8,
  },

  optionChipActive: {
    backgroundColor: Colors.primary,
  },

  optionText: {
    fontSize: 13,
    color: Colors.gray700,
  },

  optionTextActive: {
    color: Colors.white,
    fontWeight: '600',
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

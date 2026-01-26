import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AuthContainer from '../../../components/common/AuthWrapper';
import StepIndicator from '../../Authantication/Register/StepIndicator';
import { Colors, Spacing, Radius } from '../../../styles';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../ReduxToolKit/Rtk/store';
import { updateDraft } from '../../../ReduxToolKit/Slices/registerDraftSlice';

const RegisterStep1 = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [focused, setFocused] = useState<string | null>(null);
  const [dob, setDob] = useState<Date | null>(null);

  console.log('date of birth ', dob?.toISOString());
  console.log('name ', name);
  console.log('address ', address);

  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

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
        style={[styles.textInput, multiline && styles.multiline]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(field)}
        onBlur={() => setFocused(null)}
        multiline={multiline}
      />
    </View>
  );

  const handleContinue = () => {
    dispatch(
      updateDraft({
        name,
        address,
        dateofbirth: dob ? dob.toISOString() : '',
      }),
    );

    navigation.navigate('RegisterStep2');
  };
  return (
    <AuthContainer scrollable contentPadding={0}>
      <View style={styles.header}>
        <StepIndicator step={1} total={3} />
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Personal Information</Text>
        <Text style={styles.subtitle}>
          Tell us a little about yourself to get started
        </Text>

        <View style={styles.formCard}>
          {renderInput('Full Name', 'name', name, setName)}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPicker(true)}
          >
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <Text style={styles.textValue}>
                {dob ? formatDate(dob) : 'Select date'}
              </Text>
            </View>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={dob || new Date(2000, 0, 1)}
              mode="date"
              maximumDate={new Date()}
              display="calendar"
              onChange={(event: any, selectedDate?: Date) => {
                setShowPicker(false);

                if (event?.type === 'set' && selectedDate) {
                  const normalizedDate = new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth(),
                    selectedDate.getDate(),
                  );

                  setDob(normalizedDate);
                }
              }}
            />
          )}

          {renderInput('Address', 'address', address, setAddress, true)}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RegisterStep1;

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

  textValue: {
    fontSize: 16,
    color: Colors.gray900,
  },

  multiline: {
    height: 90,
    textAlignVertical: 'top',
  },

  primaryButton: {
    height: 58,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.white,
  },
});

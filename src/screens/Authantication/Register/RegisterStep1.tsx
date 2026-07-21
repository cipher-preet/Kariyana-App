import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors, Spacing, Radius } from '../../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../../styles/responsiveStyles';

import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../ReduxToolKit/Rtk/store';
import { updateDraft } from '../../../ReduxToolKit/Slices/registerDraftSlice';

const RegisterStep1 = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const [focused, setFocused] = useState<string | null>(null);
  const [dob, setDob] = useState<Date | null>(null);

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
            <View style={styles.previewAvatar} />
            <View style={styles.previewLineShort} />
            <View style={styles.previewLine} />
            <View style={styles.previewInput} />
            <View style={styles.previewInputSmall} />
            <View style={styles.previewButton} />
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.stepRow}>
            <View style={styles.stepDotActive} />
            <View style={styles.stepDot} />
            <View style={styles.stepDot} />
            <Text style={styles.stepText}>Step 1 of 3</Text>
          </View>

          <Text style={styles.eyebrow}>Create your profile</Text>
          <Text style={styles.title}>Personal information</Text>
          <Text style={styles.subtitle}>
            Tell us a little about yourself before adding shop details.
          </Text>

          {renderInput('Full name', 'name', name, setName)}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPicker(true)}
          >
            <View style={styles.inputWrap}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <Text style={[styles.textValue, !dob && styles.placeholderText]}>
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

export default RegisterStep1;

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

  previewAvatar: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: Colors.gray100,
    alignSelf: 'center',
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
    marginBottom: moderateScaleVertical(18),
  },

  previewInput: {
    height: moderateScaleVertical(30),
    borderRadius: Radius.md,
    backgroundColor: Colors.gray100,
    marginBottom: moderateScaleVertical(10),
  },

  previewInputSmall: {
    height: moderateScaleVertical(30),
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
    marginBottom: moderateScaleVertical(14),
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

  textValue: {
    fontSize: 16,
    color: Colors.gray900,
    minHeight: moderateScaleVertical(26),
  },

  placeholderText: {
    color: Colors.gray400,
  },

  multiline: {
    height: moderateScaleVertical(86),
    textAlignVertical: 'top',
  },

  primaryButton: {
    height: moderateScaleVertical(56),
    borderRadius: Radius.xl,
    backgroundColor: '#0F5A20',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScaleVertical(10),
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

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AuthContainer from '../../../components/common/AuthWrapper';
import { Colors, Spacing, Radius } from '../../../styles';

const RegisterStep1 = ({ navigation }: any) => {
  return (
    <AuthContainer scrollable contentPadding={Spacing.xl}>
      <Text style={styles.title}>Personal Details</Text>
      <Text style={styles.subtitle}>Tell us a bit about yourself</Text>

      <TextInput placeholder="Full Name" style={styles.input} />
      <TextInput placeholder="Date of Birth" style={styles.input} />
      <TextInput
        placeholder="Address"
        style={[styles.input, styles.multiline]}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('RegisterStep2')}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

export default RegisterStep1;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.gray900,
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    marginBottom: Spacing.xl,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: Colors.gray300,
    borderRadius: Radius.lg,
    paddingHorizontal: 14,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.white,
  },

  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },

  uploadBox: {
    height: 52,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.gray400,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  uploadText: {
    color: Colors.gray600,
  },

  button: {
    height: 52,
    borderRadius: Radius.lg,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
});

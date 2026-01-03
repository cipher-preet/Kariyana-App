import React from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AuthContainer from '../../../components/common/AuthWrapper';
import { Colors, Spacing, Radius } from '../../../styles';

const RegisterStep3 = ({ navigation }: any) => {
  return (
    <AuthContainer scrollable contentPadding={Spacing.xl}>
      <Text style={styles.title}>Additional Details</Text>
      <Text style={styles.subtitle}>
        Optional but recommended
      </Text>

      <TextInput placeholder="GST Number (optional)" style={styles.input} />
      <TextInput placeholder="FSSAI Number (optional)" style={styles.input} />
      <TextInput placeholder="Opening Time" style={styles.input} />
      <TextInput placeholder="Closing Time" style={styles.input} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('RegisterSuccess')}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </AuthContainer>
  );
};

export default RegisterStep3;

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


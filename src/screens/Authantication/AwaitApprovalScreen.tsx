import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AuthContainer from '../../components/common/AuthWrapper';
import { Colors, Spacing } from '../../styles';

const AwaitingApproval = () => {
  return (
    <AuthContainer>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://www.shutterstock.com/image-vector/shopping-food-basket-icon-isolated-260nw-2370040877.jpg',
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Approval Pending</Text>

        <Text style={styles.description}>
          Your shop registration has been submitted successfully.
        </Text>

        <Text style={styles.description}>
          Our team is reviewing your details. This usually takes a few hours.
        </Text>

        <TouchableOpacity style={styles.cta}>
          <Text style={styles.ctaText}>Okay, I understand</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          We’ll notify you once your account is approved.
        </Text>
      </View>
    </AuthContainer>
  );
};

export default AwaitingApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: 60,
  },

  image: {
    width: 200,
    height: 200,
    marginBottom: Spacing.xl,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.gray900,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },

  description: {
    fontSize: 15,
    color: Colors.gray600,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.sm,
    maxWidth: 280,
  },

  cta: {
    marginTop: Spacing.xl,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.white,
  },

  footerText: {
    marginTop: Spacing.lg,
    fontSize: 13,
    color: Colors.gray500,
    textAlign: 'center',
  },
});

import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../MyOrdersScreen/Header';

export const PrivacyPolicyScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Privacy Policy" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.subtitle}>
            Your privacy matters to us. This policy explains how we collect,
            use, and protect your information.
          </Text>
          <Text style={styles.updated}>Last updated: April 2026</Text>
        </View>

        <Section
          title="Information We Collect"
          content={`We collect information to provide better services to all our users. This includes personal details such as your name, phone number, email address, and account preferences.

We may also collect usage data such as interactions within the app, device information, and performance metrics to improve user experience.`}
        />

        <Section
          title="How We Use Your Information"
          content={`Your information is used to operate, maintain, and improve our services. This includes:

• Personalizing your experience  
• Processing transactions securely  
• Providing customer support  
• Sending important updates and notifications  

We ensure your data is only used for legitimate business purposes.`}
        />

        <Section
          title="Data Sharing & Disclosure"
          content={`We do not sell your personal information. However, we may share limited data with trusted third-party partners to:

• Provide infrastructure and hosting  
• Enable payment processing  
• Improve analytics and performance  

All partners are required to follow strict confidentiality and data protection standards.`}
        />

        <Section
          title="Data Security"
          content={`We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.

This includes encryption, secure servers, and regular system monitoring. While no system is completely secure, we continuously improve our safeguards.`}
        />

        <Section
          title="Your Rights & Control"
          content={`You have full control over your personal data. You can:

• Access your data  
• Request corrections  
• Delete your account  
• Opt out of communications  

To exercise your rights, please contact our support team.`}
        />

        <Section
          title="Policy Updates"
          content={`We may update this Privacy Policy from time to time to reflect changes in our services or legal requirements.

We encourage you to review this page periodically. Continued use of the app implies acceptance of updates.`}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const Section = ({ title, content }: any) => (
  <View style={styles.card}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionText}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },

  hero: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 8,
  },

  updated: {
    fontSize: 12,
    color: '#999',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 14,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },

  sectionText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});

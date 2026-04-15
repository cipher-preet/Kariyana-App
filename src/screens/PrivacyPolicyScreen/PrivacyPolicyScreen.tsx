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
            We are committed to protecting your privacy and ensuring
            transparency in how your data is handled.
          </Text>
          <Text style={styles.updated}>Last updated: April 2026</Text>
        </View>

        <Section
          title="1. Information We Collect"
          content={`We collect information necessary to provide and improve our services.

This may include:
• Personal Information: Name, phone number, email address, business details  
• Account Information: Login credentials and preferences  
• Transaction Data: Orders, payments, and purchase history  
• Device & Usage Data: IP address, device type, app interactions  

All data is collected lawfully and only for relevant business purposes.`}
        />

        <Section
          title="2. How We Use Your Information"
          content={`Your information is used to deliver a seamless and efficient experience.

We use your data to:
• Process and manage orders  
• Provide customer support  
• Personalize your experience  
• Improve platform performance  
• Send important service updates  

We do not use your data for unauthorized purposes.`}
        />

        <Section
          title="3. Data Sharing & Third Parties"
          content={`We do not sell or rent your personal data.

We may share limited information with trusted third parties for:
• Payment processing (e.g., UPI, banking partners)  
• Logistics and delivery services  
• Cloud storage and infrastructure  
• Analytics and performance tracking  

All partners are contractually obligated to maintain data confidentiality and security.`}
        />

        <Section
          title="4. Data Security"
          content={`We implement industry-standard security measures to protect your data.

This includes:
• End-to-end encryption  
• Secure servers and databases  
• Access control and authentication  
• Regular monitoring and security audits  

While we strive to protect your data, no system is completely secure.`}
        />

        <Section
          title="5. Data Retention"
          content={`We retain your data only as long as necessary for business, legal, or operational purposes.

Once data is no longer required, it is securely deleted or anonymized.`}
        />

        <Section
          title="6. Your Rights"
          content={`You have full control over your personal data.

You can:
• Access your personal information  
• Request updates or corrections  
• Request account deletion  
• Opt out of notifications  

To exercise your rights, please contact our support team.`}
        />

        <Section
          title="7. Cookies & Tracking"
          content={`We may use cookies and similar technologies to enhance user experience and analyze usage patterns.

You can manage cookie preferences through your device or browser settings.`}
        />

        <Section
          title="8. Policy Updates"
          content={`We may update this Privacy Policy periodically.

Any changes will be reflected on this page with an updated revision date. Continued use of the platform indicates acceptance of the updated policy.`}
        />

        <Section
          title="9. Contact Us"
          content={`If you have any questions or concerns about this Privacy Policy, please contact us through the support section of the app or via email.

We are committed to resolving your concerns promptly.`}
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

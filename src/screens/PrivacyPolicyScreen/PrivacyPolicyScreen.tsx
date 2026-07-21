import React from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Colors, Radius, Spacing } from '../../styles';

const PAGE_BG = '#F7F8FA';
const BRAND_GREEN = '#0B6B3A';
const BORDER = '#E7EAEE';

const POLICY_SECTIONS = [
  {
    title: 'Information We Collect',
    intro:
      'We collect information necessary to provide and improve our services.',
    points: [
      'Personal information such as name, phone number, email address, and business details.',
      'Account information such as login credentials and preferences.',
      'Transaction data including orders, payments, and purchase history.',
      'Device and usage data such as IP address, device type, and app interactions.',
    ],
    note: 'All data is collected lawfully and only for relevant business purposes.',
  },
  {
    title: 'How We Use Your Information',
    intro:
      'Your information is used to deliver a seamless and efficient experience.',
    points: [
      'Process and manage orders.',
      'Provide customer support.',
      'Personalize your experience.',
      'Improve platform performance.',
      'Send important service updates.',
    ],
    note: 'We do not use your data for unauthorized purposes.',
  },
  {
    title: 'Data Sharing And Third Parties',
    intro: 'We do not sell or rent your personal data.',
    points: [
      'Payment processing through UPI, banking partners, or payment gateways.',
      'Logistics and delivery services.',
      'Cloud storage and infrastructure providers.',
      'Analytics and performance tracking tools.',
    ],
    note:
      'All partners are contractually obligated to maintain data confidentiality and security.',
  },
  {
    title: 'Data Security',
    intro:
      'We implement industry-standard security measures to protect your data.',
    points: [
      'End-to-end encryption.',
      'Secure servers and databases.',
      'Access control and authentication.',
      'Regular monitoring and security audits.',
    ],
    note: 'While we strive to protect your data, no system is completely secure.',
  },
  {
    title: 'Data Retention',
    intro:
      'We retain your data only as long as necessary for business, legal, or operational purposes.',
    points: [
      'Data is retained to support orders, account service, compliance, and dispute resolution.',
      'Data that is no longer required is securely deleted or anonymized.',
    ],
  },
  {
    title: 'Your Rights',
    intro: 'You have control over your personal data.',
    points: [
      'Access your personal information.',
      'Request updates or corrections.',
      'Request account deletion.',
      'Opt out of notifications where available.',
    ],
    note: 'To exercise your rights, please contact our support team.',
  },
  {
    title: 'Cookies And Tracking',
    intro:
      'We may use cookies and similar technologies to enhance user experience and analyze usage patterns.',
    points: [
      'You can manage cookie preferences through your device or browser settings.',
    ],
  },
  {
    title: 'Policy Updates',
    intro: 'We may update this Privacy Policy periodically.',
    points: [
      'Any changes will be reflected on this page with an updated revision date.',
      'Continued use of the platform indicates acceptance of the updated policy.',
    ],
  },
  {
    title: 'Contact Us',
    intro:
      'If you have questions or concerns about this Privacy Policy, please contact us through the support section of the app or via email.',
    points: ['We are committed to resolving your concerns promptly.'],
  },
];

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') return 44;
  return StatusBar.currentHeight || 24;
};

const BackIcon = ({ color = Colors.white }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18 9 12l6-6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const PrivacyPolicyScreen = () => {
  const navigation = useNavigation<any>();
  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={BRAND_GREEN} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.sm }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.82}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <Text style={styles.headerSubtitle}>How your data is handled</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.summaryPanel}>
          <Text style={styles.summaryLabel}>Last Updated</Text>
          <Text style={styles.summaryValue}>April 2026</Text>
          <Text style={styles.summaryText}>
            We are committed to protecting your privacy and being transparent
            about how your information is collected, used, and protected.
          </Text>
        </View>

        {POLICY_SECTIONS.map((section, index) => (
          <PolicySection
            key={section.title}
            number={index + 1}
            title={section.title}
            intro={section.intro}
            points={section.points}
            note={section.note}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const PolicySection = ({ number, title, intro, points, note }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{`${number}. ${title}`}</Text>
    <View style={styles.sectionBody}>
      <Text style={styles.intro}>{intro}</Text>

      {points.map((point: string, index: number) => (
        <View key={`${title}-${index}`} style={styles.pointRow}>
          <View style={styles.bullet} />
          <Text style={styles.pointText}>{point}</Text>
        </View>
      ))}

      {note && <Text style={styles.note}>{note}</Text>}
    </View>
  </View>
);

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

  header: {
    minHeight: 104,
    backgroundColor: BRAND_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  headerCopy: {
    flex: 1,
  },

  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },

  headerSubtitle: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },

  summaryPanel: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    padding: Spacing.md,
    marginTop: -Spacing.lg,
    marginBottom: Spacing.lg,
  },

  summaryLabel: {
    color: Colors.gray500,
    fontSize: 11,
    fontWeight: '600',
  },

  summaryValue: {
    color: Colors.gray900,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
  },

  summaryText: {
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
    marginTop: Spacing.sm,
  },

  section: {
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: Spacing.sm,
  },

  sectionBody: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    padding: Spacing.md,
  },

  intro: {
    color: Colors.gray900,
    fontSize: 13.5,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },

  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.sm,
  },

  bullet: {
    width: 6,
    height: 6,
    borderRadius: Radius.full,
    backgroundColor: BRAND_GREEN,
    marginTop: 7,
    marginRight: Spacing.sm,
  },

  pointText: {
    flex: 1,
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
  },

  note: {
    color: BRAND_GREEN,
    fontSize: 12.5,
    fontWeight: '700',
    lineHeight: 18,
    marginTop: Spacing.md,
  },
});

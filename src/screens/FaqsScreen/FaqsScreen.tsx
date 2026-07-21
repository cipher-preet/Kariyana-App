import React, { useMemo, useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Colors, Radius, Spacing } from '../../styles';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const PAGE_BG = '#F7F8FA';
const BRAND_GREEN = '#0B6B3A';
const BORDER = '#E7EAEE';

const FAQ_SECTIONS = [
  {
    title: 'Platform',
    items: [
      {
        question: 'What is this platform about?',
        answer:
          'Our platform helps shopkeepers purchase quality products at wholesale prices with reliable online delivery directly to their stores.',
      },
      {
        question: 'Who can use this service?',
        answer:
          'This service is designed for shopkeepers, retailers, and small business owners looking for affordable and quality inventory.',
      },
      {
        question: 'Why should I choose this platform?',
        answer:
          'We provide affordable pricing, reliable delivery, quality products, and a seamless ordering experience tailored for shopkeepers.',
      },
    ],
  },
  {
    title: 'Orders And Delivery',
    items: [
      {
        question: 'How do I place an order?',
        answer:
          'Browse products, add items to your cart, and place your order using our secure checkout process.',
      },
      {
        question: 'How fast is delivery?',
        answer:
          'We aim to deliver orders within 24-48 hours depending on your location.',
      },
      {
        question: 'Can I track my order?',
        answer:
          'Yes, you can track your order in real-time through the app or website.',
      },
      {
        question: 'Can I reorder previous items easily?',
        answer:
          'Yes, you can quickly reorder from your order history with just one click.',
      },
    ],
  },
  {
    title: 'Products And Pricing',
    items: [
      {
        question: 'Do you offer bulk pricing?',
        answer:
          'Yes, we provide competitive bulk pricing to ensure maximum profit margins for shopkeepers.',
      },
      {
        question: 'What types of products are available?',
        answer:
          'We offer a wide range of products including groceries, daily essentials, and other wholesale items.',
      },
      {
        question: 'Is there a minimum order value?',
        answer:
          'Yes, a minimum order value may apply to ensure cost-effective delivery.',
      },
      {
        question: 'Are the products quality checked?',
        answer:
          'Absolutely. All products go through strict quality checks before being delivered.',
      },
    ],
  },
  {
    title: 'Payments And Support',
    items: [
      {
        question: 'What payment methods are available?',
        answer:
          'We support multiple payment options including UPI, cards, net banking, and cash on delivery if available.',
      },
      {
        question: 'What if I receive damaged goods?',
        answer:
          'You can raise a return or replacement request through the app, and our team will assist you promptly.',
      },
      {
        question: 'Do you offer credit or pay-later options?',
        answer:
          'We are working on introducing credit options for trusted shopkeepers to help manage cash flow.',
      },
      {
        question: 'How can I contact support?',
        answer:
          'You can reach our support team via the app, email, or helpline for any assistance.',
      },
    ],
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

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d={expanded ? 'm18 15-6-6-6 6' : 'm6 9 6 6 6-6'}
      stroke={BRAND_GREEN}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FaqsScreen = () => {
  const navigation = useNavigation<any>();
  const statusBarHeight = getStatusBarHeight();
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const totalQuestions = useMemo(
    () =>
      FAQ_SECTIONS.reduce(
        (total, section) => total + section.items.length,
        0,
      ),
    [],
  );

  const toggle = (key: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveKey(activeKey === key ? null : key);
  };

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
          <Text style={styles.headerTitle}>FAQs</Text>
          <Text style={styles.headerSubtitle}>Common questions and answers</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.summaryPanel}>
          <Text style={styles.summaryLabel}>Help Topics</Text>
          <Text style={styles.summaryValue}>{totalQuestions} questions</Text>
        </View>

        {FAQ_SECTIONS.map(section => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionBody}>
              {section.items.map((item, index) => {
                const key = `${section.title}-${index}`;
                const isActive = activeKey === key;
                const isLast = index === section.items.length - 1;

                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.84}
                    style={[styles.item, isLast && styles.noBorder]}
                    onPress={() => toggle(key)}
                  >
                    <View style={styles.questionRow}>
                      <Text style={styles.question}>{item.question}</Text>
                      <View style={styles.iconButton}>
                        <ChevronIcon expanded={isActive} />
                      </View>
                    </View>

                    {isActive && (
                      <Text style={styles.answer}>{item.answer}</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FaqsScreen;

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

  container: {
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
    overflow: 'hidden',
  },

  item: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },

  question: {
    flex: 1,
    color: Colors.gray900,
    fontSize: 13.5,
    fontWeight: '700',
    lineHeight: 19,
  },

  iconButton: {
    width: 30,
    height: 30,
    borderRadius: Radius.full,
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  answer: {
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
    marginTop: Spacing.sm,
    paddingRight: 42,
  },
});

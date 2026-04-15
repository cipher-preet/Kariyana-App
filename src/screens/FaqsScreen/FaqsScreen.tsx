import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../MyOrdersScreen/Header';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const DATA = [
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
    question: 'How do I place an order?',
    answer:
      'Browse products, add items to your cart, and place your order using our secure checkout process.',
  },
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
    question: 'How fast is delivery?',
    answer:
      'We aim to deliver orders within 24–48 hours depending on your location.',
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
  {
    question: 'Can I track my order?',
    answer:
      'Yes, you can track your order in real-time through the app or website.',
  },
  {
    question: 'What payment methods are available?',
    answer:
      'We support multiple payment options including UPI, cards, net banking, and cash on delivery (if available).',
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
  {
    question: 'Can I reorder previous items easily?',
    answer:
      'Yes, you can quickly reorder from your order history with just one click.',
  },
  {
    question: 'Why should I choose this platform?',
    answer:
      'We provide affordable pricing, reliable delivery, quality products, and a seamless ordering experience tailored for shopkeepers.',
  },
];

const FaqsScreen = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="FAQs" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <Text style={styles.heading}>Frequently Asked Questions</Text>

        <View style={styles.card}>
          {DATA.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.85}
                style={[styles.item, isActive && styles.activeItem]}
                onPress={() => toggle(index)}
              >
                <View style={styles.row}>
                  <Text style={styles.question}>{item.question}</Text>

                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{isActive ? '−' : '+'}</Text>
                  </View>
                </View>

                {isActive && <Text style={styles.answer}>{item.answer}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FaqsScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },

  activeItem: {
    backgroundColor: '#F8FAFC',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  question: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },

  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4F46E5',
  },

  answer: {
    marginTop: 10,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

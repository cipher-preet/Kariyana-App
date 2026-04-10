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
    question: 'How to equalize airpods?',
    answer: 'Go to Settings > Music > EQ and select your preferred preset .',
  },
  {
    question: 'How to clean my airpods?',
    answer:
      'Use a soft, dry cloth. Avoid liquids and clean gently with cotton.',
  },
  {
    question: 'How to connect to my watch?',
    answer: 'Turn on Bluetooth → Open Watch App → Pair device → Follow steps.',
  },
  {
    question: 'Support related questions',
    answer: 'Reach out via support section or email.',
  },
  {
    question: 'System related questions',
    answer: 'Restart device or check system settings.',
  },
  {
    question: 'System related questions',
    answer: 'Restart device or check system settings.',
  },
  {
    question: 'System related questions',
    answer: 'Restart device or check system settings.',
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

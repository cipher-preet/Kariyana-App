import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../MyOrdersScreen/Header';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const categories = [
  'Bug',
  'UI Issue',
  'Performance',
  'Feature Request',
  'Other',
];

const ShareFeedBackScreen = () => {
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleRating = (value: number) => {
    LayoutAnimation.easeInEaseOut();
    setRating(value);
  };

  const handleCategory = (cat: string) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedCategory(cat);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Share Feedback" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Help us improve your experience</Text>

        <View style={styles.card}>
          <Text style={styles.label}>How was your experience?</Text>
          <View style={styles.row}>
            {[1, 2, 3, 4, 5].map(item => (
              <TouchableOpacity key={item} onPress={() => handleRating(item)}>
                <Text
                  style={[styles.star, rating >= item && styles.activeStar]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Select Category</Text>
          <View style={styles.chipContainer}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                onPress={() => handleCategory(cat)}
                style={[
                  styles.chip,
                  selectedCategory === cat && styles.activeChip,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategory === cat && styles.activeChipText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Your Feedback</Text>
          <TextInput
            placeholder="Tell us what can be improved..."
            placeholderTextColor="#999"
            multiline
            value={feedback}
            onChangeText={setFeedback}
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Attach Screenshot (Optional)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadText}>＋ Add Image</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ShareFeedBackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111',
    marginTop: 10,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#222',
  },

  row: {
    flexDirection: 'row',
  },

  star: {
    fontSize: 28,
    marginRight: 8,
    color: '#ccc',
  },

  activeStar: {
    color: '#FFB800',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F3F6',
    marginRight: 8,
    marginBottom: 8,
  },

  activeChip: {
    backgroundColor: '#111',
  },

  chipText: {
    fontSize: 13,
    color: '#555',
  },

  activeChipText: {
    color: '#fff',
  },

  input: {
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#111',
  },

  uploadBox: {
    height: 80,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  uploadText: {
    color: '#666',
    fontSize: 14,
  },

  submitBtn: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#111',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },

  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

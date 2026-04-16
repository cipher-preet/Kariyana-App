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
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
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
  const [images, setImages] = useState<any[]>([]);

  const handleRating = (value: number) => {
    LayoutAnimation.easeInEaseOut();
    setRating(value);
  };

  const handleCategory = (cat: string) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedCategory(cat);
  };

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 5,
    });

    if (result.assets) {
      setImages(prev => [...prev, ...(result.assets || [])]);
    }
  };

  const removeImage = (index: number) => {
    const updated = [...images];
    updated.splice(index, 1);
    setImages(updated);
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
              <TouchableOpacity
                key={item}
                onPress={() => handleRating(item)}
                style={[styles.starBox, rating >= item && styles.activeStarBox]}
              >
                <Text style={styles.star}>★</Text>
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
            placeholderTextColor="#9CA3AF"
            multiline
            value={feedback}
            onChangeText={setFeedback}
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Attach Screenshot</Text>

          <TouchableOpacity style={styles.uploadBox} onPress={handleImagePick}>
            <Text style={styles.uploadText}>＋ Add Images</Text>
          </TouchableOpacity>

          <View style={styles.imageRow}>
            {images.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: img.uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShareFeedBackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },

  subtitle: {
    marginTop: 14,
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 22,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 4,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },

  row: {
    flexDirection: 'row',
  },

  starBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF1F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  activeStarBox: {
    backgroundColor: '#FFE8A3',
  },

  star: {
    fontSize: 20,
    color: '#FFB800',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#EEF1F6',
    marginRight: 8,
    marginBottom: 10,
  },

  activeChip: {
    backgroundColor: '#111827',
  },

  chipText: {
    fontSize: 13,
    color: '#4B5563',
  },

  activeChipText: {
    color: '#fff',
  },

  input: {
    minHeight: 110,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#111',
  },

  uploadBox: {
    height: 80,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  uploadText: {
    color: '#6B7280',
    fontSize: 14,
  },

  imageRow: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },

  imageWrapper: {
    position: 'relative',
    marginRight: 10,
    marginTop: 10,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  removeBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#111',
    borderRadius: 10,
    paddingHorizontal: 5,
  },

  removeText: {
    color: '#fff',
    fontSize: 12,
  },

  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    alignItems: 'center',
  },

  submitBtn: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
  },

  submitText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

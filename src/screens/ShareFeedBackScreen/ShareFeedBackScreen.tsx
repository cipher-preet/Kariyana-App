import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  LayoutAnimation,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useShareAppFeedbackMutation } from '../../ReduxToolKit/Api/accountPageApi';
import { Colors, Radius, Spacing } from '../../styles';
import AppAlert, {
  AppAlertState,
  createHiddenAlert,
} from '../../components/common/AppAlert';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const PAGE_BG = '#F7F8FA';
const BRAND_GREEN = '#0B6B3A';
const BORDER = '#E7EAEE';

const CATEGORIES = [
  'Bug',
  'UI Issue',
  'Performance',
  'Feature Request',
  'Other',
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

const StarIcon = ({ active }: { active: boolean }) => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8L12 3.5Z"
      fill={active ? '#F7CB14' : 'transparent'}
      stroke={active ? '#B98600' : Colors.gray400}
      strokeWidth={1.8}
      strokeLinejoin="round"
    />
  </Svg>
);

const UploadIcon = ({ color = BRAND_GREEN }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 16V4m0 0 4 4m-4-4-4 4M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CloseIcon = ({ color = Colors.white }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path
      d="m7 7 10 10M17 7 7 17"
      stroke={color}
      strokeWidth={2.6}
      strokeLinecap="round"
    />
  </Svg>
);

const ShareFeedBackScreen = () => {
  const navigation = useNavigation<any>();
  const statusBarHeight = getStatusBarHeight();
  const userId = useSelector((state: any) => state.auth.userId);

  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [alert, setAlert] = useState<AppAlertState>(createHiddenAlert());

  const [shareFeedback, { isLoading }] = useShareAppFeedbackMutation();

  const canSubmit = useMemo(
    () => Boolean(userId && rating && selectedCategory && feedback.trim()),
    [feedback, rating, selectedCategory, userId],
  );

  const handleSubmit = async () => {
    if (!canSubmit) {
      setAlert({
        visible: true,
        title: 'Incomplete feedback',
        message: 'Please add rating, category, and feedback.',
        variant: 'warning',
      });
      return;
    }

    try {
      const formData = new FormData();

      formData.append('userId', userId);
      formData.append('rating', String(rating));
      formData.append('type', selectedCategory || '');
      formData.append('feedback', feedback.trim());

      images.forEach((img, index) => {
        formData.append('images', {
          uri: img.uri,
          name: img.fileName || `image_${index}.jpg`,
          type: img.type || 'image/jpeg',
        });
      });

      const res: any = await shareFeedback(formData).unwrap();
      setRating(0);
      setSelectedCategory(null);
      setFeedback('');
      setImages([]);
      setAlert({
        visible: true,
        title: 'Feedback submitted',
        message:
          res?.data?.message || 'Thank you for sharing your feedback.',
        variant: 'success',
      });
    } catch (err) {
      console.log('Share Feedback Error:', err);
      setAlert({
        visible: true,
        title: 'Submission failed',
        message: 'Please try again after a moment.',
        variant: 'error',
      });
    }
  };

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

    if (result.assets?.length) {
      setImages(prev => [...prev, ...(result.assets || [])].slice(0, 5));
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, itemIndex) => itemIndex !== index));
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
          <Text style={styles.headerTitle}>Share Feedback</Text>
          <Text style={styles.headerSubtitle}>Help improve your app experience</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.summaryPanel}>
          <Text style={styles.summaryLabel}>Feedback Form</Text>
          <Text style={styles.summaryValue}>Tell us what worked and what needs attention.</Text>
        </View>

        <FormSection title="Experience Rating">
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => handleRating(item)}
                style={[styles.starButton, rating >= item && styles.activeStarButton]}
                activeOpacity={0.82}
              >
                <StarIcon active={rating >= item} />
              </TouchableOpacity>
            ))}
          </View>
        </FormSection>

        <FormSection title="Feedback Category">
          <View style={styles.chipContainer}>
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat;

              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => handleCategory(cat)}
                  style={[styles.chip, isActive && styles.activeChip]}
                  activeOpacity={0.82}
                >
                  <Text style={[styles.chipText, isActive && styles.activeChipText]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </FormSection>

        <FormSection title="Details">
          <TextInput
            placeholder="Describe the issue or suggestion clearly."
            placeholderTextColor={Colors.gray500}
            multiline
            value={feedback}
            onChangeText={setFeedback}
            style={styles.input}
            textAlignVertical="top"
          />
        </FormSection>

        <FormSection title="Attachments">
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={handleImagePick}
            activeOpacity={0.84}
          >
            <UploadIcon />
            <View style={styles.uploadCopy}>
              <Text style={styles.uploadTitle}>Add screenshots</Text>
              <Text style={styles.uploadSubText}>Up to 5 images</Text>
            </View>
          </TouchableOpacity>

          {images.length > 0 && (
            <View style={styles.imageRow}>
              {images.map((img, index) => (
                <View key={`${img.uri}-${index}`} style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.image} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                    activeOpacity={0.82}
                  >
                    <CloseIcon />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </FormSection>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, (!canSubmit || isLoading) && styles.disabledButton]}
          onPress={handleSubmit}
          activeOpacity={0.86}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.submitText}>Submit Feedback</Text>
          )}
        </TouchableOpacity>
      </View>

      <AppAlert
        {...alert}
        onClose={() => setAlert(createHiddenAlert())}
      />
    </View>
  );
};

const FormSection = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

export default ShareFeedBackScreen;

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
    paddingBottom: 112,
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
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
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
    padding: Spacing.md,
  },

  ratingRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },

  starButton: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeStarButton: {
    borderColor: '#F3D066',
    backgroundColor: '#FFF8DB',
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },

  chip: {
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: 9,
  },

  activeChip: {
    borderColor: BRAND_GREEN,
    backgroundColor: '#EAF6EE',
  },

  chipText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: Colors.gray600,
  },

  activeChipText: {
    color: BRAND_GREEN,
  },

  input: {
    minHeight: 126,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#FBFCFD',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: 13,
    fontWeight: '600',
    color: Colors.gray900,
    lineHeight: 19,
  },

  uploadBox: {
    minHeight: 70,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#BBDCC6',
    backgroundColor: '#FBFDFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },

  uploadCopy: {
    marginLeft: Spacing.sm,
  },

  uploadTitle: {
    color: Colors.gray900,
    fontSize: 13,
    fontWeight: '700',
  },

  uploadSubText: {
    color: Colors.gray500,
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
  },

  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
  },

  removeButton: {
    position: 'absolute',
    top: -7,
    right: -7,
    width: 22,
    height: 22,
    borderRadius: Radius.full,
    backgroundColor: Colors.gray900,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },

  submitButton: {
    height: 50,
    borderRadius: Radius.md,
    backgroundColor: BRAND_GREEN,
    alignItems: 'center',
    justifyContent: 'center',
  },

  disabledButton: {
    opacity: 0.58,
  },

  submitText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

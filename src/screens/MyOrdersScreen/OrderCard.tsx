import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserRatingProductsMutation } from '../../ReduxToolKit/Api/accountPageApi';

const OrderCard = ({ item }: any) => {
  const navigation = useNavigation<any>();

  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [desc, setDesc] = useState('');

  const [addRating, { isLoading }] = useUserRatingProductsMutation();

  const handleSubmitRating = async () => {
    try {
      const payload = {
        id: item.id,
        rating,
        review: desc,
      };

      const res = await addRating(payload);

      if (res) {
        item.status = 'Rated';
        setShowReview(false);
        item.rating = rating;
        item.review = desc;
        Alert.alert(res.data.data.message);
      }
    } catch (error) {
      console.log('Rating Error:', error);
    }
  };

  const handlePress = useCallback(() => {
    navigation.navigate('OrderDetailsScreen', {
      orders: item,
    });
  }, [navigation, item]);

  if (!item || !item.items?.length) return null;

  const firstItem = item.items[0];

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.container}
      onPress={handlePress}
    >
      <View style={styles.row}>
        <Image source={{ uri: firstItem.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.topRow}>
            <Text style={[styles.status, getStatusColor(item.status)]}>
              {getStatusText(item.status)}
            </Text>

            <Text style={styles.orderId}>#{item.id?.slice(-5)}</Text>
          </View>

          <Text numberOfLines={2} style={styles.title}>
            {firstItem.title}
          </Text>

          <Text style={styles.meta}>
            {item.items.length} item{item.items.length > 1 ? 's' : ''} • ₹
            {item.totalAmount}
          </Text>

          <Text style={styles.subMeta}>
            {item.itemCount > 1
              ? `+${item.itemCount - 1} more items`
              : 'Single item'}
          </Text>

          {item.canReview && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={e => {
                e.stopPropagation();
                setShowReview(prev => !prev);
              }}
            >
              <Text style={styles.review}>
                {showReview ? 'Cancel Review' : 'Write a Review'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.arrowContainer}>
          <Text style={styles.arrow}>›</Text>
        </View>
      </View>

      {item?.status === 'Rated' && (
        <View style={styles.ratedContainer}>
          <Text style={styles.ratedText}>Rated</Text>

          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <Text key={star} style={styles.star}>
                {star <= (item?.rating || 0) ? '⭐' : '☆'}
              </Text>
            ))}
          </View>

          {item?.review ? (
            <Text style={styles.reviewText}>{item.review}</Text>
          ) : null}
        </View>
      )}

      {showReview && (
        <View style={styles.reviewBox}>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map(star => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text
                  style={[styles.star, star <= rating && styles.activeStar]}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            placeholder="Write your review..."
            value={desc}
            onChangeText={setDesc}
            multiline
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmitRating}
            disabled={isLoading}
          >
            <Text style={styles.submitText}>
              {isLoading ? 'Submitting...' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.divider} />
    </TouchableOpacity>
  );
};

export default memo(OrderCard);

const getStatusText = (status: string) => {
  switch (status) {
    case 'Delivered':
      return 'Delivered';
    case 'Refund completed':
      return 'Refund completed';
    case 'Cancelled':
      return 'Cancelled';
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return { color: '#16A34A' };
    case 'Refund completed':
      return { color: '#2563EB' };
    case 'Cancelled':
      return { color: '#DC2626' };
    default:
      return { color: '#374151' };
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 28,
  },

  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },

  content: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 8,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  status: {
    fontSize: 13,
    fontWeight: '600',
  },

  orderId: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    lineHeight: 20,
    marginBottom: 4,
  },

  meta: {
    fontSize: 13,
    color: '#374151',
    marginBottom: 2,
  },

  subMeta: {
    fontSize: 12,
    color: '#6B7280',
  },

  review: {
    fontSize: 13,
    color: '#2563EB',
    marginTop: 6,
    fontWeight: '500',
  },

  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 6,
  },

  arrow: {
    fontSize: 22,
    color: '#9CA3AF',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  reviewBox: {
    marginTop: 10,
  },

  starRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  star: {
    fontSize: 22,
    color: '#D1D5DB',
    marginRight: 6,
  },

  activeStar: {
    color: '#FACC15',
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 8,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 8,
  },

  submitBtn: {
    backgroundColor: '#111827',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  submitText: {
    color: '#fff',
    fontWeight: '600',
  },

  ratedContainer: {
    marginTop: 8,
    marginBottom: 8,
  },

  ratedText: {
    color: 'green',
    fontWeight: '600',
    marginBottom: 6,
  },

  reviewText: {
    marginTop: 6,
    color: '#555',
    fontSize: 14,
    lineHeight: 20,
  },
});

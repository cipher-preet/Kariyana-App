import React, { memo, useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useUserRatingProductsMutation } from '../../ReduxToolKit/Api/accountPageApi';
import { Colors, Radius, Shadows, Spacing } from '../../styles';
import AppAlert, {
  AppAlertState,
  createHiddenAlert,
} from '../../components/common/AppAlert';
import {
  getOrderStatusLabel,
  normalizeOrderStatus,
} from '../../utils/orderStatus';

type IconProps = {
  size?: number;
  color?: string;
};

const CheckIcon = ({ size = 16, color = '#11853D' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Path
      d="m8 12.2 2.4 2.4L16.4 9"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ClockIcon = ({ size = 16, color = '#5F6B7A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Path
      d="M12 7.5v5l3.2 1.9"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CloseIcon = ({ size = 16, color = '#DC2626' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={2} />
    <Path
      d="m9 9 6 6M15 9l-6 6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
    />
  </Svg>
);

const PackageIcon = ({ size = 22, color = '#8E8E93' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m4 7.5 8-4 8 4-8 4-8-4Z"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
    <Path
      d="M4 7.5v9l8 4 8-4v-9M12 11.5v9"
      stroke={color}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ size = 18, color = '#8E8E93' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="m9 6 6 6-6 6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EditIcon = ({ size = 14, color = '#0B6B3A' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 20h9"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="m16.5 3.5 4 4L8 20H4v-4L16.5 3.5Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const STATUS_CONFIG: Record<
  string,
  { color: string; backgroundColor: string; Icon: React.FC<IconProps> }
> = {
  Delivered: {
    color: '#11853D',
    backgroundColor: '#E9F8EE',
    Icon: CheckIcon,
  },
  Rated: {
    color: '#11853D',
    backgroundColor: '#E9F8EE',
    Icon: CheckIcon,
  },
  cancelled: {
    color: '#DC2626',
    backgroundColor: '#FFF2F0',
    Icon: CloseIcon,
  },
  'Refund completed': {
    color: '#2563EB',
    backgroundColor: '#EEF4FF',
    Icon: CheckIcon,
  },
};

const OrderCard = ({ item }: any) => {
  const navigation = useNavigation<any>();
  const normalizedStatus = normalizeOrderStatus(item?.orderStatus || item?.status);

  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(item?.rating || 0);
  const [desc, setDesc] = useState(item?.review || '');
  const [alert, setAlert] = useState<AppAlertState>(createHiddenAlert());

  const [addRating, { isLoading }] = useUserRatingProductsMutation();

  const handleSubmitRating = async () => {
    try {
      const payload = {
        id: item.id,
        rating,
        review: desc,
      };

      const res: any = await addRating(payload);

      if (res) {
        item.status = 'Rated';
        item.orderStatus = 'Rated';
        setShowReview(false);
        item.rating = rating;
        item.review = desc;
        setAlert({
          visible: true,
          title: 'Review submitted',
          message: res?.data?.data?.message || 'Thanks for your feedback.',
          variant: 'success',
        });
      }
    } catch (error) {
      console.log('Rating Error:', error);
      setAlert({
        visible: true,
        title: 'Review failed',
        message: 'Please try submitting your review again.',
        variant: 'error',
      });
    }
  };

  const handlePress = useCallback(() => {
    navigation.navigate('OrderDetailsScreen', {
      orders: item,
    });
  }, [navigation, item]);

  if (!item || !item.items?.length) return null;

  const firstItem = item.items[0];
  const itemTotal = item.itemCount || item.items.length;
  const moreItems = Math.max(itemTotal - 1, 0);
  const statusConfig = getStatusConfig(normalizedStatus);
  const StatusIcon = statusConfig.Icon;

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.88}
        style={styles.container}
        onPress={handlePress}
      >
        <View style={styles.headerRow}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: statusConfig.backgroundColor },
            ]}
          >
            <StatusIcon size={14} color={statusConfig.color} />
            <Text style={[styles.statusText, { color: statusConfig.color }]}>
              {getOrderStatusLabel(normalizedStatus)}
            </Text>
          </View>
          <Text style={styles.orderId}>Order #{item.id?.slice(-6)}</Text>
        </View>

        <View style={styles.bodyRow}>
          <View style={styles.imageBox}>
            {firstItem.image ? (
              <Image source={{ uri: firstItem.image }} style={styles.image} />
            ) : (
              <PackageIcon />
            )}
          </View>

          <View style={styles.content}>
            <Text numberOfLines={2} style={styles.title}>
              {firstItem.title || firstItem.name || 'Order item'}
            </Text>

            <Text style={styles.meta}>
              Rs{item.totalAmount}  |  {itemTotal} item
              {itemTotal > 1 ? 's' : ''}
            </Text>

            <Text style={styles.subMeta}>
              {moreItems > 0 ? `+${moreItems} more items` : 'Single item'}
            </Text>
          </View>

          <ChevronRightIcon />
        </View>

        {normalizedStatus === 'Rated' && (
          <View style={styles.noteBox}>
            <Text style={styles.noteTitle}>Rated {item?.rating || 0}/5</Text>
            {item?.review ? (
              <Text numberOfLines={2} style={styles.noteText}>
                {item.review}
              </Text>
            ) : null}
          </View>
        )}

        {item.canReview && normalizedStatus !== 'Rated' && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={e => {
              e.stopPropagation();
              setShowReview(prev => !prev);
            }}
            style={styles.reviewToggle}
          >
            <EditIcon />
            <Text style={styles.reviewToggleText}>
              {showReview ? 'Cancel review' : 'Write review'}
            </Text>
          </TouchableOpacity>
        )}

        {showReview && (
          <View style={styles.reviewBox}>
            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity
                  key={star}
                  activeOpacity={0.8}
                  onPress={() => setRating(star)}
                  style={[
                    styles.ratingButton,
                    star <= rating && styles.activeRatingButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.ratingButtonText,
                      star <= rating && styles.activeRatingButtonText,
                    ]}
                  >
                    {star}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              placeholder="Write your review"
              placeholderTextColor={Colors.gray500}
              value={desc}
              onChangeText={setDesc}
              multiline
              style={styles.input}
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.submitBtn}
              onPress={handleSubmitRating}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.white} size="small" />
              ) : (
                <Text style={styles.submitText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      <AppAlert
        {...alert}
        onClose={() => setAlert(createHiddenAlert())}
      />
    </>
  );
};

export default memo(OrderCard);

const getStatusConfig = (status: string) => {
  const normalizedStatus = normalizeOrderStatus(status);

  return (
    STATUS_CONFIG[normalizedStatus] || {
      color: '#5F6B7A',
      backgroundColor: '#F2F2F7',
      Icon: ClockIcon,
    }
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.soft,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  orderId: {
    fontSize: 11,
    color: Colors.gray500,
    fontWeight: '500',
  },

  bodyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageBox: {
    width: 66,
    height: 66,
    borderRadius: Radius.md,
    backgroundColor: '#F1F2F4',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '92%',
    height: '92%',
    resizeMode: 'contain',
  },

  content: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
    minWidth: 0,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray900,
    lineHeight: 19,
  },

  meta: {
    marginTop: Spacing.xs,
    fontSize: 12,
    color: Colors.gray700,
    fontWeight: '500',
  },

  subMeta: {
    marginTop: 2,
    fontSize: 11.5,
    color: Colors.gray600,
    fontWeight: '600',
  },

  reviewToggle: {
    marginTop: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
  },

  reviewToggleText: {
    fontSize: 12,
    color: '#0B6B3A',
    fontWeight: '600',
  },

  reviewBox: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },

  ratingRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },

  ratingButton: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    backgroundColor: Colors.white,
  },

  activeRatingButton: {
    backgroundColor: '#0B6B3A',
    borderColor: '#0B6B3A',
  },

  ratingButtonText: {
    fontSize: 12,
    color: Colors.gray700,
    fontWeight: '600',
  },

  activeRatingButtonText: {
    color: Colors.white,
  },

  input: {
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    minHeight: 72,
    textAlignVertical: 'top',
    marginBottom: Spacing.sm,
    color: Colors.gray900,
    fontSize: 13,
  },

  submitBtn: {
    backgroundColor: '#0B6B3A',
    height: 40,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submitText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },

  noteBox: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
  },

  noteTitle: {
    color: '#11853D',
    fontWeight: '600',
    fontSize: 12,
  },

  noteText: {
    marginTop: Spacing.xs,
    color: Colors.gray700,
    fontSize: 12.5,
    lineHeight: 18,
  },
});

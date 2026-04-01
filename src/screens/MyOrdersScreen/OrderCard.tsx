import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OrderCard = ({ item }: any) => {
  const navigation = useNavigation<any>();

  if (!item || !item.items?.length) return null;

  const firstItem = item.items[0];
  const remainingCount = item.items.length - 1;

  const handlePress = () => {
    navigation.navigate('OrderDetailsScreen', {
      order: item, 
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.95} style={styles.wrapper} onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.top}>
          <View style={styles.imageStack}>
            {item.items.slice(0, 3).map((product: any, index: number) => (
              <Image
                key={index}
                source={{ uri: product.image }}
                style={[
                  styles.image,
                  {
                    transform: [{ translateX: index * 10 }],
                    zIndex: 10 - index,
                  },
                ]}
              />
            ))}

            {remainingCount > 2 && (
              <View style={styles.moreOverlay}>
                <Text style={styles.moreText}>+{remainingCount - 2}</Text>
              </View>
            )}
          </View>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {firstItem.title}
            </Text>

            <Text style={styles.subtitle}>
              {remainingCount > 0
                ? `${item.items.length} items`
                : firstItem.subtitle}
            </Text>

            <View style={[styles.statusChip, getStatusBg(item.status)]}>
              <Text style={[styles.statusText, getStatusColor(item.status)]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <View>
            <Text style={styles.price}>₹{item.totalAmount}</Text>
            <Text style={styles.extra}>
              {remainingCount > 0
                ? `Includes ${remainingCount} more`
                : 'Single item'}
            </Text>
          </View>

          {item.canReview && (
            <TouchableOpacity style={styles.cta}>
              <Text style={styles.ctaText}>Review</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

const getStatusBg = (status: string) => {
  switch (status) {
    case 'Delivered':
      return { backgroundColor: '#EAF7EE' };
    case 'Refund completed':
      return { backgroundColor: '#EEF3FF' };
    case 'Cancelled':
      return { backgroundColor: '#FDEDED' };
    default:
      return { backgroundColor: '#F3F3F3' };
  }
};
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered':
      return { color: '#1F9254' };
    case 'Refund completed':
      return { color: '#2F6FED' };
    case 'Cancelled':
      return { color: '#D93025' };
    default:
      return { color: '#555' };
  }
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 14,
    paddingTop: 10,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },

  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageStack: {
    width: 80,
    height: 65,
    justifyContent: 'center',
  },

  image: {
    width: 48,
    height: 65,
    borderRadius: 14,
    position: 'absolute',
    backgroundColor: '#F5F5F5',
  },

  moreOverlay: {
    position: 'absolute',
    right: -6,
    top: 20,
    backgroundColor: '#111',
    borderRadius: 16,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },

  moreText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A0A0A',
    lineHeight: 20,
  },

  subtitle: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },

  statusChip: {
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },

  bottom: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
    letterSpacing: 0.3,
  },

  extra: {
    fontSize: 11,
    color: '#9A9A9A',
    marginTop: 3,
  },

  cta: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FAFAFA',
  },

  ctaText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
  },
});

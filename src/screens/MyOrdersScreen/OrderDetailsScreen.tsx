import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import HorizontalProgress from './HorizontalProgress';
import { useGetOrderDetailWithOrderIdQuery } from '../../ReduxToolKit/Api/accountPageApi';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

const PAGE_COLORS = {
  background: '#F6F8F2',
  header: '#0B6B3A',
  mutedGreen: '#E9F8EE',
};

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

const DownloadIcon = ({ color = '#0B6B3A' }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3v11m0 0 4-4m-4 4-4-4M5 20h14"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const OrderDetailsScreen = ({ route }: any) => {
  const navigation = useNavigation<any>();
  const { orders } = route.params;
  const statusBarHeight = getStatusBarHeight();

  const { data, isLoading, isError } = useGetOrderDetailWithOrderIdQuery({
    orderId: orders?.id,
  });

  const order = data?.data;

  const statusMap: any = {
    Recieved: 0,
    Confirmed: 0,
    Dispatched: 1,
    outForDelivery: 2,
    Delivered: 3,
    Cancelled: 1,
  };

  const steps = [
    { title: 'Order Confirmed' },
    { title: 'Dispatched' },
    { title: 'Out for Delivery' },
    { title: 'Delivered' },
  ];

  const currentStep = statusMap[order?.status] ?? 0;

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <StatusBar
          backgroundColor={PAGE_COLORS.header}
          barStyle="light-content"
        />
        <ActivityIndicator size="large" color={PAGE_COLORS.header} />
        <Text style={styles.loaderText}>Loading order details</Text>
      </View>
    );
  }

  if (isError || !order) {
    return (
      <View style={styles.loader}>
        <Text style={styles.errorText}>Failed to load order details</Text>
      </View>
    );
  }

  const address = order.address || {};
  const orderItems = order.items || [];

  return (
    <View style={styles.root}>
      <StatusBar
        backgroundColor={PAGE_COLORS.header}
        barStyle="light-content"
      />

      <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.sm }]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Order Details</Text>
          <Text style={styles.headerSubtitle}>#{order.id?.slice(-8) || orders?.id}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <View>
              <Text style={styles.sectionEyebrow}>Status</Text>
              <Text style={styles.statusTitle}>{order.status || 'Processing'}</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{order.paymentStatus || 'Order'}</Text>
            </View>
          </View>
          {order.subtitle ? (
            <Text style={styles.statusText}>{order.subtitle}</Text>
          ) : null}
          <HorizontalProgress steps={steps} currentStep={currentStep} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Items in this order</Text>

          {orderItems.map((item: any, index: number) => (
            <View
              key={item.id || `${item.name}-${index}`}
              style={[
                styles.itemRow,
                index !== orderItems.length - 1 && styles.itemDivider,
              ]}
            >
              <View style={styles.itemLeft}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemCopy}>
                  <Text numberOfLines={2} style={styles.itemName}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
                </View>
              </View>

              <Text style={styles.itemPrice}>Rs{item.price * item.quantity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Delivery details</Text>

          <InfoBlock
            label="Address"
            value={`${address.houseVillage || ''}, ${address.areaStreet || ''}, ${
              address.city || ''
            } - ${address.pincode || ''}`}
          />

          <InfoBlock
            label="Contact"
            value={`${address.name || ''} | ${address.phone || ''}`}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price details</Text>

          {orderItems.map((item: any, index: number) => (
            <Row
              key={item.id || `${item.name}-price-${index}`}
              label={item.name}
              value={`Rs${item.price} x ${item.quantity}`}
            />
          ))}

          <View style={styles.divider} />

          <Row label="Total amount" value={`Rs${order.totalAmount}`} bold />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment</Text>

          <Text style={styles.value}>
            {order.paymentStatus?.toUpperCase() || 'PENDING'}
          </Text>

          <TouchableOpacity activeOpacity={0.85} style={styles.invoiceBtn}>
            <DownloadIcon />
            <Text style={styles.invoiceText}>Download Invoice</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order ID</Text>
          <Text selectable style={styles.value}>
            {order.id}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderDetailsScreen;

const InfoBlock = ({ label, value }: any) => (
  <View style={styles.infoBlock}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Row = ({ label, value, bold }: any) => (
  <View style={styles.rowBetween}>
    <Text numberOfLines={1} style={styles.rowLabel}>
      {label}
    </Text>
    <Text style={[styles.rowValue, bold && styles.boldValue]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PAGE_COLORS.background,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PAGE_COLORS.background,
  },

  loaderText: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },

  errorText: {
    color: Colors.gray700,
    fontSize: 13,
    fontWeight: '500',
  },

  header: {
    backgroundColor: PAGE_COLORS.header,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
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
    fontWeight: '500',
    marginTop: 2,
  },

  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },

  statusCard: {
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    ...Shadows.soft,
  },

  statusTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },

  sectionEyebrow: {
    color: PAGE_COLORS.header,
    fontSize: 10.5,
    fontWeight: '600',
    marginBottom: 2,
  },

  statusTitle: {
    color: Colors.gray900,
    fontSize: 18,
    fontWeight: '700',
  },

  statusBadge: {
    borderRadius: Radius.full,
    backgroundColor: PAGE_COLORS.mutedGreen,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },

  statusBadgeText: {
    color: PAGE_COLORS.header,
    fontSize: 10.5,
    fontWeight: '600',
  },

  statusText: {
    fontSize: 12.5,
    fontWeight: '600',
    marginTop: Spacing.sm,
    color: Colors.gray600,
    lineHeight: 18,
  },

  card: {
    marginTop: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    ...Shadows.soft,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: Spacing.md,
    color: Colors.gray900,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },

  itemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },

  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    paddingRight: Spacing.md,
  },

  itemImage: {
    width: 54,
    height: 54,
    borderRadius: Radius.md,
    backgroundColor: '#F1F2F4',
    resizeMode: 'contain',
  },

  itemCopy: {
    flex: 1,
    marginLeft: Spacing.sm,
    minWidth: 0,
  },

  itemName: {
    fontSize: 13.5,
    fontWeight: '600',
    color: Colors.gray900,
    lineHeight: 18,
  },

  itemQty: {
    fontSize: 11.5,
    color: Colors.gray600,
    marginTop: 2,
    fontWeight: '600',
  },

  itemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray900,
  },

  infoBlock: {
    marginTop: Spacing.xs,
  },

  label: {
    fontSize: 11.5,
    color: Colors.gray500,
    fontWeight: '500',
  },

  value: {
    fontSize: 13,
    marginTop: 4,
    color: Colors.gray900,
    lineHeight: 19,
    fontWeight: '500',
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.md,
    marginVertical: 6,
  },

  rowLabel: {
    flex: 1,
    fontSize: 12.5,
    color: Colors.gray700,
    fontWeight: '600',
  },

  rowValue: {
    fontSize: 12.5,
    color: Colors.gray900,
    fontWeight: '500',
  },

  boldValue: {
    fontWeight: '700',
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: Colors.gray100,
    marginVertical: Spacing.sm,
  },

  invoiceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: '#BFE5CB',
    height: 44,
    borderRadius: Radius.md,
    marginTop: Spacing.md,
    backgroundColor: '#F7FCF8',
  },

  invoiceText: {
    fontWeight: '700',
    fontSize: 13,
    color: PAGE_COLORS.header,
  },
});

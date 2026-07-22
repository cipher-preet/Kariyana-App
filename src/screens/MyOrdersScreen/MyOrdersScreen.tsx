import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import OrderCard from './OrderCard';
import { useGetOrderDetailByuserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';
import { useSelector } from 'react-redux';
import { Colors, Spacing } from '../../styles';

const PAGE_COLORS = {
  background: '#F6F8F2',
  header: '#0B6B3A',
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

const MyOrdersScreen = () => {
  const navigation = useNavigation<any>();
  const user_Id = useSelector((state: any) => state.auth.userId);

  const [cursor, setCursor] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingMoreRef = useRef(false);
  const lastProcessedCursor = useRef<string | null>('INIT');
  const statusBarHeight = getStatusBarHeight();

  const { data, isFetching, isSuccess } = useGetOrderDetailByuserIdQuery(
    { userId: user_Id, cursor },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  useEffect(() => {
    if (!isSuccess || isFetching) return;

    const apiData = data?.data?.data;
    if (!apiData || !Array.isArray(apiData)) return;

    if (lastProcessedCursor.current === cursor) return;
    lastProcessedCursor.current = cursor;

    setOrders(prev => {
      if (cursor === null) return [...apiData];

      const existingIds = new Set(prev.map((item: any) => item.id));
      const newItems = apiData.filter((item: any) => !existingIds.has(item.id));

      if (newItems.length === 0) return prev;
      return [...prev, ...newItems];
    });

    setHasMore(data?.data?.hasMore ?? false);
    isLoadingMoreRef.current = false;
  }, [data, isFetching, isSuccess, cursor]);

  const renderItem = useCallback(({ item }: any) => {
    const formattedItem = {
      ...item,
      items: item.items?.length
        ? item.items
        : [{ title: item.title, image: item.image }],
    };
    return <OrderCard item={formattedItem} />;
  }, []);

  const loadMore = useCallback(() => {
    if (isLoadingMoreRef.current || !hasMore || isFetching) return;

    const nextCursor = data?.data?.nextCursor;
    if (!nextCursor) return;

    isLoadingMoreRef.current = true;
    setCursor(nextCursor);
  }, [data, hasMore, isFetching]);

  const isInitialLoading = isFetching && orders.length === 0;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.getParent()?.navigate('Account', { screen: 'AccountMain' });
  };

  return (
    <View style={styles.root}>
      <StatusBar
        backgroundColor={PAGE_COLORS.header}
        barStyle="light-content"
      />

      <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.md }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.82}
          onPress={handleBack}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.headerCopy}>
          <Text style={styles.title}>My Orders</Text>
          <Text style={styles.subtitle}>Track recent purchases and delivery status</Text>
        </View>
      </View>

      {isInitialLoading ? (
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={PAGE_COLORS.header} />
          <Text style={styles.stateText}>Loading orders</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) =>
            item?.id ? item.id.toString() : `fallback-${index}`
          }
          renderItem={renderItem}
          extraData={orders.length}
          onEndReached={loadMore}
          onEndReachedThreshold={0.45}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptyText}>
                Your placed orders will appear here.
              </Text>
            </View>
          }
          ListFooterComponent={
            isFetching && orders.length > 0 ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={PAGE_COLORS.header} />
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PAGE_COLORS.background,
  },
  header: {
    backgroundColor: PAGE_COLORS.header,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
  list: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: 120,
  },
  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateText: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxxl * 2,
  },
  emptyTitle: {
    color: Colors.gray900,
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    marginTop: Spacing.xs,
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },
  footerLoader: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
});

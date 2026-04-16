import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import OrderCard from './OrderCard';
import { useGetOrderDetailByuserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';

const MyOrdersScreen = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingMoreRef = useRef(false);
  const lastProcessedCursor = useRef<string | null>('INIT');

  const { data, isFetching, isSuccess } = useGetOrderDetailByuserIdQuery(
    { userId: '697ceb6542c7dd37f30b05ea', cursor },
    { refetchOnMountOrArgChange: true },
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
      items: [{ title: item.title, image: item.image }],
    };
    return <OrderCard item={formattedItem} />;
  }, []);

  const loadMore = useCallback(() => {
    if (isLoadingMoreRef.current || !hasMore || isFetching) {
      return;
    }

    const nextCursor = data?.data?.nextCursor;
    if (!nextCursor) {
      return;
    }

    isLoadingMoreRef.current = true;
    setCursor(nextCursor);
  }, [data, hasMore, isFetching]);

  const handleScroll = useCallback(
    ({ nativeEvent }: any) => {
      const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
      const isNearBottom =
        layoutMeasurement.height + contentOffset.y >= contentSize.height * 0.85;

      if (isNearBottom) loadMore();
    },
    [loadMore],
  );

  return (
    <SafeAreaView style={styles.root}>
      <Header title="My Orders" />

      <FlatList
        data={orders}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : `fallback-${index}`
        }
        renderItem={renderItem}
        extraData={orders.length}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        ListFooterComponent={
          isFetching ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  list: { paddingBottom: 120 },
});

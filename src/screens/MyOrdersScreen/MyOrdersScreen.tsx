import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from './Header';
import OrderCard from './OrderCard';
import { useGetOrderDetailByuserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';

const MyOrdersScreen = () => {
  const [cursor, setCursor] = useState<string | null>(null);
  const [orders, setOrders] = useState<any[]>([]);

  const { data, isLoading, isFetching } = useGetOrderDetailByuserIdQuery(
    { userId: '697ceb6542c7dd37f30b05ea', cursor },
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (!data?.data?.data) return;

    setOrders(prev => {
      if (!cursor) return data.data.data;

      const newItems = data.data.data.filter(
        (item: any) => !prev.some(p => p.id === item.id),
      );

      return [...prev, ...newItems];
    });
  }, [data]);

  const renderItem = useCallback(({ item }: any) => {
    const formattedItem = {
      ...item,
      items: [
        {
          title: item.title,
          image: item.image,
        },
      ],
    };

    return <OrderCard item={formattedItem} />;
  }, []);

  const loadMore = useCallback(() => {
    if (
      data?.data?.hasMore &&
      !isFetching &&
      data?.data?.nextCursor !== cursor
    ) {
      setCursor(data.data.nextCursor);
    }
  }, [data, isFetching, cursor]);

  return (
    <SafeAreaView style={styles.root}>
      <Header title="My Orders" />

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetching ? <ActivityIndicator size="large" /> : null
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={7}
        removeClippedSubviews
      />
    </SafeAreaView>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 100,
  },
});

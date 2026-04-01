import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import OrderCard from './OrderCard';
import Header from './Header';

const orders = [
  {
    id: '1',
    status: 'Refund completed',
    totalAmount: 1642,
    canReview: false,
    items: [
      {
        title: 'Prestige 1200 W Induction Cooktop',
        subtitle: 'Refund processed',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Extra Pan',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
    ],
  },
  {
    id: '3',
    status: 'Cancelled',
    totalAmount: 999,
    canReview: true,
    items: [
      {
        title: 'The 22 Immutable Laws of Marketing',
        subtitle: 'Delivered on Feb 09',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Notebook',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Pen Pack',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
    ],
  },
  {
    id: '4',
    status: 'Delivered',
    totalAmount: 999,
    canReview: true,
    items: [
      {
        title: 'The 22 Immutable Laws of Marketing',
        subtitle: 'Delivered on Feb 09',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Notebook',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Pen Pack',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
    ],
  },
  {
    id: '2',
    status: 'Delivered',
    totalAmount: 999,
    canReview: true,
    items: [
      {
        title: 'The 22 Immutable Laws of Marketing',
        subtitle: 'Delivered on Feb 09',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Notebook',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
      {
        title: 'Pen Pack',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPd9Ld5mIJeME9tlwGvyjbzVc55jeJ-5hA-A&s',
      },
    ],
  },
];

const MyOrdersScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.root}>
      <Header title="My Orders" />
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <OrderCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
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

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMeQuery } from '../ReduxToolKit/Api/authApi';

const RootNavigator = () => {
  const navigation = useNavigation<any>();
  const { data, isLoading, isError } = useGetMeQuery();

  useEffect(() => {
    if (isLoading) return;

    if (isError || data?.data?.status === 'REGISTER') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
      return;
    }

    if (isError || data?.data?.status === 'PENDING') {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Auth',
            params: { screen: 'RegisterSuccess' },
          },
        ],
      });
      return;
    }

    if (data?.data?.status === 'APPROVED') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  }, [data, isLoading, isError]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RootNavigator;

import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGetMeQuery } from '../ReduxToolKit/Api/authApi';

const RootNavigator = () => {
  const navigation = useNavigation<any>();
  const { data, isLoading, isError, isSuccess } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading) return;

    if (isError) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
      return;
    }

    if (isSuccess) {
      const status = data?.data?.status;

      switch (status) {
        case 'REGISTER':
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
          break;

        case 'PENDING':
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Auth',
                params: { screen: 'RegisterSuccess' },
              },
            ],
          });
          break;

        case 'APPROVED':
          navigation.reset({
            index: 0,
            routes: [{ name: 'App' }],
          });
          break;

        default:
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
      }
    }
  }, [data, isLoading, isError, isSuccess]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RootNavigator;

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SafeAreaView } from 'react-native-safe-area-context';
import debounce from 'lodash.debounce';

import { Colors, Spacing } from '../../styles';
import Header from '../MyOrdersScreen/Header';
import SearchIcon from '../../assest/search';

import {
  useLazyGetProductDetalsByIdQuery,
  useLazySearchProductQuery,
} from '../../ReduxToolKit/Api/productApi';

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const columns = width >= 900 ? 6 : width >= 700 ? 5 : width >= 520 ? 4 : 3;
  const gap = Spacing.sm;
  const contentWidth = width - Spacing.lg * 2;
  const cardWidth = (contentWidth - gap * (columns - 1)) / columns;
  const imageSize = Math.min(96, Math.max(68, cardWidth * 0.72));

  const [triggerSearch, { data, isFetching, isError }] =
    useLazySearchProductQuery();

  const [getProductById, { isFetching: isDetailLoading }] =
    useLazyGetProductDetalsByIdQuery();

  const results = data?.data || [];

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length >= 2) {
          triggerSearch({ q: text });
        }
      }, 400),
    [triggerSearch],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setQuery(text);

      if (text.length < 2) return;

      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  const clearSearch = () => {
    setQuery('');
  };

  const handleProductPress = async (id: string) => {
    try {
      const res = await getProductById({ productId: id }).unwrap();
      const product = res?.data;

      if (product) {
        navigation.navigate('ProductDetails', {
          product,
        });
      }
    } catch (error) {
      console.log('Error fetching product details', error);
    }
  };

  const renderItem = ({ item }: any) => {
    const imageUrl = item?.images || 'https://via.placeholder.com/100';

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.card, { width: cardWidth }]}
        onPress={() => handleProductPress(item._id)}
      >
        <View style={[styles.imageBox, { width: imageSize, height: imageSize }]}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>

        <Text numberOfLines={2} style={styles.productName}>
          {item.name}
        </Text>

        <Text style={styles.price}>₹{item.mrp}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Search Products" />

      <View style={styles.container}>
        <View style={styles.searchBar}>
          <SearchIcon width={18} height={18} color={Colors.gray500} />

          <TextInput
            placeholder="Search for atta, dal, oil..."
            placeholderTextColor={Colors.gray500}
            value={query}
            onChangeText={handleSearch}
            autoFocus
            style={styles.input}
          />

          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Text style={styles.clear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {isFetching && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={styles.fetchingIndicator}
          />
        )}

        {isError && <Text style={styles.error}>Something went wrong</Text>}

        <FlatList
          data={results}
          keyExtractor={(item: any) => item._id}
          key={columns}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
        {isDetailLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.gray900,
  },

  clear: {
    fontSize: 16,
    color: Colors.gray500,
    paddingHorizontal: 5,
  },

  imageBox: {
    borderRadius: 12,
    backgroundColor: '#F3F4F6',

    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  image: {
    width: '85%',
    height: '85%',
    borderRadius: 10,
  },
  productName: {
    marginTop: 8,
    fontSize: 12.5,
    textAlign: 'center',
    color: Colors.gray900,
    fontWeight: '500',
  },
  price: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  empty: {
    textAlign: 'center',
    marginTop: 50,
    color: Colors.gray500,
    fontSize: 14,
  },

  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: 10,
  },
  fetchingIndicator: {
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import debounce from 'lodash.debounce';

import { Colors, Radius, Shadows, Spacing } from '../../styles';
import SearchIcon from '../../assest/search';

import {
  useLazyGetProductDetalsByIdQuery,
  useLazySearchProductQuery,
} from '../../ReduxToolKit/Api/productApi';

const SEARCH_COLORS = {
  page: '#F6F8F2',
  green: '#0B6B3A',
  greenSoft: '#E8F5EC',
  gold: '#F7CB14',
  surface: '#FFFFFF',
};

const BackIcon = () => (
  <Svg width={19} height={19} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18 9 12l6-6"
      stroke={Colors.gray900}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchScreen = () => {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const columns = width >= 900 ? 6 : width >= 700 ? 5 : width >= 520 ? 4 : 3;
  const gap = Spacing.sm;
  const contentWidth = width - Spacing.lg * 2;
  const cardWidth = (contentWidth - gap * (columns - 1)) / columns;
  const imageHeight = Math.min(108, Math.max(82, cardWidth * 0.88));

  const [triggerSearch, { data, isFetching, isError }] =
    useLazySearchProductQuery();

  const [getProductById, { isFetching: isDetailLoading }] =
    useLazyGetProductDetalsByIdQuery();

  const results = query.length >= 2 ? data?.data || [] : [];

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        if (text.length >= 2) {
          triggerSearch({ q: text });
        }
      }, 400),
    [triggerSearch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = useCallback(
    (text: string) => {
      setQuery(text);

      if (text.length < 2) {
        debouncedSearch.cancel();
        return;
      }

      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  const clearSearch = () => {
    setQuery('');
    debouncedSearch.cancel();
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.getParent()?.navigate('Home', { screen: 'HomeMain' });
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
    const sellingPrice = item?.sellingPrice || item?.price || item?.mrp;
    const hasDiscount =
      item?.mrp && sellingPrice && Number(item.mrp) > Number(sellingPrice);
    const unitLabel = [item?.quantityPerUnit, item?.unit]
      .filter(Boolean)
      .join(' ');

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.card, { width: cardWidth }]}
        onPress={() => handleProductPress(item._id)}
      >
        <View style={[styles.imageBox, { height: imageHeight }]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />

          {hasDiscount && (
            <View style={styles.offerBadge}>
              <Text style={styles.offerText}>Deal</Text>
            </View>
          )}
        </View>

        <View style={styles.cardBody}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.name}
          </Text>

          {unitLabel ? (
            <Text numberOfLines={1} style={styles.unit}>
              {unitLabel}
            </Text>
          ) : null}

          <View style={styles.priceRow}>
            <Text style={styles.price}>Rs{sellingPrice}</Text>
            {hasDiscount && <Text style={styles.mrp}>Rs{item.mrp}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const showPrompt = query.length < 2;
  const showNoResults = query.length >= 2 && !isFetching && results.length === 0;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        backgroundColor={SEARCH_COLORS.page}
        barStyle="dark-content"
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.82}
            style={styles.backButton}
            onPress={handleBack}
          >
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.headerCopy}>
            <Text style={styles.headerTitle}>Search Products</Text>
            <Text numberOfLines={1} style={styles.headerSubtitle}>
              Fast lookup for wholesale essentials
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.searchPanel}>
          <View style={styles.searchBar}>
            <SearchIcon width={19} height={19} color={SEARCH_COLORS.green} />

            <TextInput
              placeholder="Search atta, dal, oil, snacks..."
              placeholderTextColor={Colors.gray500}
              value={query}
              onChangeText={handleSearch}
              autoFocus
              autoCorrect={false}
              returnKeyType="search"
              style={styles.input}
            />

            {query.length > 0 && (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
                activeOpacity={0.8}
              >
                <Text style={styles.clear}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isFetching && (
          <ActivityIndicator
            size="small"
            color={SEARCH_COLORS.green}
            style={styles.fetchingIndicator}
          />
        )}

        <FlatList
          data={results}
          keyExtractor={(item: any) => item._id}
          key={columns}
          numColumns={columns}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            results.length > 0 ? (
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsTitle}>Results for "{query}"</Text>
                <Text style={styles.resultsCount}>{results.length} items</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <SearchIcon width={24} height={24} color={SEARCH_COLORS.green} />
              </View>
              <Text style={styles.emptyTitle}>
                {isError
                  ? 'Unable to search right now'
                  : showPrompt
                  ? 'Start with two letters'
                  : showNoResults
                  ? 'No products found'
                  : 'Searching products'}
              </Text>
              <Text style={styles.emptyCopy}>
                {isError
                  ? 'Please check your connection and try again.'
                  : showPrompt
                  ? 'Try searching by product name, category, or pack size.'
                  : showNoResults
                  ? 'Try a different spelling or a broader product name.'
                  : 'Matching wholesale products will appear here.'}
              </Text>
            </View>
          }
        />

        {isDetailLoading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={SEARCH_COLORS.green} />
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
    backgroundColor: SEARCH_COLORS.page,
  },

  container: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },

  header: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EDE2',
    ...Shadows.soft,
  },

  headerCopy: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
  },

  headerTitle: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
    color: Colors.gray900,
    textAlign: 'center',
  },

  headerSubtitle: {
    marginTop: 1,
    fontSize: 11.5,
    lineHeight: 15,
    fontWeight: '600',
    color: Colors.gray600,
    textAlign: 'center',
  },

  headerSpacer: {
    width: 40,
    height: 40,
  },

  searchPanel: {
    backgroundColor: SEARCH_COLORS.surface,
    borderRadius: Radius.md,
    padding: 5,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#E8EDE2',
    ...Shadows.soft,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray50,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 46,
  },

  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 15,
    color: Colors.gray900,
    fontWeight: '600',
    paddingVertical: 0,
  },

  clearButton: {
    width: 26,
    height: 26,
    borderRadius: Radius.full,
    backgroundColor: Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  clear: {
    fontSize: 12,
    lineHeight: 14,
    color: Colors.gray600,
    fontWeight: '700',
  },

  fetchingIndicator: {
    marginBottom: Spacing.md,
  },

  listContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxxl,
  },

  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  resultsTitle: {
    flex: 1,
    paddingRight: Spacing.sm,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '800',
    color: Colors.gray900,
  },

  resultsCount: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray500,
  },

  columnWrapper: {
    justifyContent: 'space-between',
    gap: Spacing.sm,
  },

  card: {
    marginBottom: Spacing.sm,
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: 7,
    borderWidth: 1,
    borderColor: '#E9ECE5',
  },

  imageBox: {
    width: '100%',
    borderRadius: Radius.md,
    backgroundColor: '#F1F3EE',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  image: {
    width: '90%',
    height: '90%',
  },

  offerBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: SEARCH_COLORS.gold,
    borderRadius: Radius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  offerText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '800',
    color: SEARCH_COLORS.green,
  },

  cardBody: {
    paddingTop: 7,
  },

  productName: {
    fontSize: 12,
    lineHeight: 15,
    color: Colors.gray900,
    fontWeight: '700',
    minHeight: 30,
  },

  unit: {
    marginTop: 3,
    fontSize: 10.5,
    lineHeight: 13,
    color: Colors.gray600,
    fontWeight: '500',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 7,
  },

  price: {
    backgroundColor: SEARCH_COLORS.green,
    borderRadius: Radius.xs,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '800',
    color: Colors.white,
  },

  mrp: {
    fontSize: 10.5,
    color: Colors.gray500,
    textDecorationLine: 'line-through',
    fontWeight: '600',
  },

  emptyState: {
    flex: 1,
    minHeight: 320,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: Radius.full,
    backgroundColor: SEARCH_COLORS.greenSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  emptyTitle: {
    fontSize: 18,
    lineHeight: 23,
    color: Colors.gray900,
    fontWeight: '800',
    textAlign: 'center',
  },

  emptyCopy: {
    marginTop: Spacing.xs,
    fontSize: 13,
    lineHeight: 19,
    color: Colors.gray600,
    fontWeight: '500',
    textAlign: 'center',
  },

  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(246,248,242,0.78)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

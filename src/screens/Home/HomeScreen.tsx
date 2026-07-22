import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, Radius, Spacing } from '../../styles';
import SearchBar from './SearchBar';
import CategoryTabBar from './CategoryTabBar';
import { Product } from '../../types';
import HomeIcon from '../../assest/home';
import SaleGrid from './SaleGrid';
import BannerCarousel from './BannerCarousel';
import ProductGridSection from './ProductGridSection';
import SeeAllSection from './SeeAllSection';
import EventsSection from './EventsSection';
import BottomBrandSection from '../../components/common/ButtomSection';
import {
  useLazyGetHomePageDataQuery,
  useLazyGetTrendSectionDataForHomePageQuery,
} from '../../ReduxToolKit/Api/productApi';

import { useNavigation } from '@react-navigation/native';
import { useGetParentcatandTagDataQuery } from '../../ReduxToolKit/Api';
import { LocationIcon, BoltIcon } from './HomeIcons';

const HOME_COLORS = {
  page: '#F6F8F2',
  hero: '#0B6B3A',
  heroDark: '#07512E',
  accent: '#F7CB14',
};

export type TrendSection = {
  _id: string;
  TrendName: string;
  products: Product[];
};

type HomeMediaItem = {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl: string;
};

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  }
  return StatusBar.currentHeight || 24;
};

const getMediaUrl = (item: any) => {
  if (typeof item === 'string') return item;

  return (
    item?.image ||
    item?.images ||
    item?.url ||
    item?.banner ||
    item?.bannerImage ||
    item?.imageUrl ||
    item?.mediaUrl ||
    item?.thumbnail ||
    ''
  );
};

const toMediaArray = (items: any) => {
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
};

const normalizeHomeMedia = (items: any): HomeMediaItem[] => {
  return toMediaArray(items)
    .map((item, index) => {
      const imageUrl = getMediaUrl(item);

      if (!imageUrl) return null;

      return {
        id: item?._id || item?.id || `${imageUrl}-${index}`,
        title: item?.title || item?.name || item?.bannerName,
        subtitle: item?.subtitle || item?.description,
        imageUrl,
      };
    })
    .filter(Boolean) as HomeMediaItem[];
};

const normalizeTrendSections = (payload: any): TrendSection[] => {
  const rawTrends =
    payload?.products ||
    payload?.trends ||
    payload?.trendSections ||
    payload?.trendSection ||
    payload?.data ||
    payload ||
    [];

  return toMediaArray(rawTrends)
    .map((trend, index) => {
      const rawProducts =
        trend?.products ||
        trend?.product ||
        trend?.trendProducts ||
        trend?.items ||
        trend?.productList ||
        [];

      const products = toMediaArray(rawProducts)
        .map((item: any) => item?.product || item?.productId || item)
        .filter((item: any) => item && (item._id || item.id));

      if (products.length === 0) return null;

      return {
        _id: trend?._id || trend?.id || `trend-${index}`,
        TrendName:
          trend?.TrendName ||
          trend?.trendName ||
          trend?.title ||
          trend?.name ||
          `Trend ${index + 1}`,
        products,
      };
    })
    .filter(Boolean) as TrendSection[];
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [trigger, { isFetching }] = useLazyGetHomePageDataQuery();
  const [triggerTrend] = useLazyGetTrendSectionDataForHomePageQuery();
  const { data: catData } = useGetParentcatandTagDataQuery();

  const [selectedCat, setSelectedCat] = useState('all');

  const categories = useMemo(() => {
    if (!catData?.data) return [];

    const apiCats = catData.data.map((item: any) => ({
      id: item._id,
      title: item.name,
      icon: item.image ? (
        <Image
          source={{ uri: item.image }}   // ---- change this part and add icons when Parent category is defined -----
          style={styles.categoryImage}
        />
      ) : (
        <HomeIcon width={18} height={18} color="white" />
      ),
    }));

    return [
      {
        id: 'all',
        title: 'All',
        icon: <HomeIcon width={18} height={18} color="white" />,
      },
      ...apiCats,
    ];
  }, [catData]);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCat(categories[0].id);
    }
  }, [categories]);

  const [trendProducts, setTrendProducts] = useState<TrendSection[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [banners, setBanners] = useState<HomeMediaItem[]>([]);
  const [carousels, setCarousels] = useState<HomeMediaItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const statusBarHeight = getStatusBarHeight();

  const loadHomeData = async (nextCursor: string | null) => {
    if (!hasNext && nextCursor !== null) return;
    if (isFetching) return;

    try {
      const response = await trigger({
        cursor: nextCursor ?? undefined,
        limit: 2,
      }).unwrap();

      const apiData = response.data;

      if (!initialLoaded) {
        setBanners(
          normalizeHomeMedia(
            apiData.banners || apiData.banner || apiData.homeBanners || [],
          ),
        );
        setCarousels(
          normalizeHomeMedia(
            apiData.carosels ||
              apiData.carousels ||
              apiData.carousel ||
              apiData.sliders ||
              [],
          ),
        );
        setInitialLoaded(true);
      }

      setSections(prev => {
        const existingIds = new Set(prev.map(item => item._id));

        const filteredNew = apiData.data.filter(
          (item: any) => !existingIds.has(item._id),
        );

        return [...prev, ...filteredNew];
      });

      setCursor(apiData.nextCursor);
      setHasNext(apiData.hasNextPage);
    } catch (error) {
      console.log('Pagination error:', error);
    }
  };

  const handleScroll = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;

    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isNearBottom && hasNext && !isFetching) {
      loadHomeData(cursor);
    }
  };

  const getProductImage = (item: any) => {
    if (typeof item?.images === 'string') return item.images;
    if (Array.isArray(item?.images)) {
      const firstImage = item.images[0];
      return typeof firstImage === 'string'
        ? firstImage
        : firstImage?.url || firstImage?.image || firstImage?.uri;
    }

    return item?.image || item?.url || item?.thumbnail;
  };

  const mapProduct = (item: any) => ({
    _id: item._id || item.id,
    name: item.name,
    images: getProductImage(item),
    price: item.sellingPrice || item.price,
    mrp: item.mrp,
    rating: item.rating,
    reviewCount: item.reviewCount,
    sellingPrice: item.sellingPrice || item.price,
    unit: item.unit,
    quantityPerUnit: item.quantityPerUnit,
    marketPrice: item.marketPrice,
    sku: item.sku,
    subcategoryId: item.subcategoryId || item.childCategoryId || item.childCatId,
    categoryId: item.categoryId,
    childCatId: item.childCatId,
    childCategoryId: item.childCategoryId,
  });

  const mappedEvents = banners.map((item, index) => ({
    id: item.id,
    title: item.title || `Offer ${index + 1}`,
    image: { uri: item.imageUrl },
    onPress: () => console.log('Banner clicked', item.imageUrl),
  }));

  const loadTrendProducts = async () => {
    try {
      const response = await triggerTrend().unwrap();

      const trends = normalizeTrendSections(response.data);

      setTrendProducts(trends);
    } catch (err) {
      console.log('Trend API error', err);
    }
  };

  useEffect(() => {
    loadHomeData(null);
    loadTrendProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.hero, { paddingTop: statusBarHeight + Spacing.md }]}>
        <View style={styles.locationRow}>
          <View style={styles.locationCopy}>
            <View style={styles.locationLabelRow}>
              <LocationIcon size={13} color="rgba(255,255,255,0.74)" />
              <Text style={styles.deliveryLabel}>Wholesale delivery to</Text>
            </View>
            <Text style={styles.deliveryTitle}>Kariyana Market</Text>
          </View>
          <View style={styles.deliveryBadge}>
            <BoltIcon size={12} color={HOME_COLORS.hero} />
            <Text style={styles.deliveryBadgeText}>24-48 hrs</Text>
          </View>
        </View>
        <SearchBar />
        <View style={styles.heroGap} />
        <CategoryTabBar
          categories={categories}
          selectedId={selectedCat}
          onSelect={item => {
            setSelectedCat(item.id);

            navigation.navigate('Categories', {
              screen: 'ProductGrid',
              params: {
                categoryId: item.id,
                categoryName: item.title,
                type: 'Parentcategory',
              },
            });
          }}
        />
      </View>

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={(w, h) => {
          if (h < 800 && hasNext && !isFetching) {
            loadHomeData(cursor);
          }
        }}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {trendProducts.map(trend => (
          <SaleGrid
            key={trend._id}
            title={trend.TrendName}
            data={trend.products.map(mapProduct)}
            onAdd={id => console.log('add', id)}
          />
        ))}

        {carousels.length > 0 && (
          <BannerCarousel
            data={carousels.map(item => ({
              id: item.id,
              title: item.title,
              subtitle: item.subtitle,
              image: { uri: item.imageUrl },
            }))}
            onPress={() => {}}
          />
        )}

        {mappedEvents.length > 0 && (
          <EventsSection title="Latest offers" data={mappedEvents} />
        )}

        {sections.map(section => (
          <React.Fragment key={section._id}>
            <ProductGridSection
              title={section.categoryName}
              data={section.products.map(mapProduct)}
            />
            <SeeAllSection
              title={`See all ${section.categoryName}`}
              onPress={() =>
                navigation.navigate('Categories', {
                  screen: 'ProductGrid',
                  params: {
                    categoryId: section.categoryId,
                    categoryName: section.categoryName,
                  },
                })
              }
            />
          </React.Fragment>
        ))}

        {isFetching && (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.loader}
          />
        )}

        <BottomBrandSection />
      </ScrollView>
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HOME_COLORS.page,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },

  hero: {
    backgroundColor: HOME_COLORS.hero,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: HOME_COLORS.heroDark,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },

  locationCopy: {
    flex: 1,
    paddingRight: Spacing.sm,
  },

  locationLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },

  deliveryLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 10.5,
    fontWeight: '600',
  },

  deliveryTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 1,
  },

  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: HOME_COLORS.accent,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },

  deliveryBadgeText: {
    color: HOME_COLORS.hero,
    fontSize: 10.5,
    fontWeight: '600',
  },

  heroGap: {
    height: 6,
  },

  categoryImage: {
    width: 18,
    height: 18,
    borderRadius: 4,
  },

  loader: {
    marginVertical: 20,
  },
});

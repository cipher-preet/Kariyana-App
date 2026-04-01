import React, { useEffect, useState } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors, Radius, Shadows, Spacing } from '../../styles';
import SearchBar from './SearchBar';
import CategoryTabBar from './CategoryTabBar';
import { Category, Product } from '../../types';
import HomeIcon from '../../assest/home';
import SaleGrid from './SaleGrid';
import BannerCarousel from './BannerCarousel';
import ProductGridSection from './ProductGridSection';
import SeeAllSection from './SeeAllSection';
import EventsSection from './EventsSection';
import BottomBrandSection from '../../components/common/ButtomSection';
import {
  useGetHomePageDataQuery,
  useLazyGetHomePageDataQuery,
  useLazyGetTrendSectionDataForHomePageQuery,
} from '../../ReduxToolKit/Api/productApi';
import { useNavigation } from '@react-navigation/native';

interface ApiProduct {
  _id: string;
  name: string;
  images: string;
  mrp: number;
  sellingPrice: number;
  reviewCount: number;
  rating: number;
  unit: string;
  quantityPerUnit: number;
}

export type TrendSection = {
  _id: string;
  TrendName: string;
  products: Product[];
};

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  }
  return StatusBar.currentHeight || 24;
};

const categoriesSample: Category[] = [
  {
    id: 'all',
    title: 'All',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: 'wedding',
    title: 'Wedding',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: 'winter',
    title: 'Winter',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: 'electronics',
    title: 'Electronics',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '1',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '2',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '3',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '4',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
  {
    id: '5',
    title: 'Beauty',
    icon: <HomeIcon width={18} height={18} color="white" />,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [trigger, { isFetching }] = useLazyGetHomePageDataQuery();
  const [triggerTrend] = useLazyGetTrendSectionDataForHomePageQuery();

  const [trendProducts, setTrendProducts] = useState<TrendSection[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [banners, setBanners] = useState<string[]>([]);
  const [carousels, setCarousels] = useState<string[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [selectedCat, setSelectedCat] = React.useState('all');
  const statusBarHeight = getStatusBarHeight();

  useEffect(() => {
    loadHomeData(null);
  }, []);

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
        setBanners(apiData.banners || []);
        setCarousels(apiData.carosels || []);
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

  const mapProduct = (item: any) => ({
    _id: item._id,
    name: item.name,
    images: item.images,
    price: item.sellingPrice,
    mrp: item.mrp,
    rating: item.rating,
    reviewCount: item.reviewCount,
    sellingPrice: item.sellingPrice,
    unit: item.unit,
    quantityPerUnit: item.quantityPerUnit,
    marketPrice: item.marketPrice,
    sku: item.sku,
  });

  const mappedEvents = banners.slice(0, 3).map((url, index) => ({
    id: index.toString(),
    title: `Offer ${index + 1}`,
    image: { uri: url },
    onPress: () => console.log('Banner clicked', url),
  }));

  const loadTrendProducts = async () => {
    try {
      const response = await triggerTrend().unwrap();

      const trends = response.data.products;

      setTrendProducts(trends);
    } catch (err) {
      console.log('Trend API error', err);
    }
  };

  useEffect(() => {
    loadHomeData(null);
    loadTrendProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.hero, { paddingTop: statusBarHeight + Spacing.lg }]}>
        <SearchBar />
        <View style={{ height: Spacing.md }} />
        <CategoryTabBar
          categories={categoriesSample}
          selectedId={selectedCat}
          onSelect={setSelectedCat}
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
            data={carousels.map((url, index) => ({
              id: index.toString(),
              image: { uri: url },
            }))}
            onPress={() => {}}
          />
        )}

         {mappedEvents.length >= 3 && (
          <EventsSection title="Events this week" data={mappedEvents} />
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
                navigation.navigate('categories', {
                  screen: 'productgrid',
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
            style={{ marginVertical: 20 }}
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
    backgroundColor: Colors.white,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },

  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    borderBottomLeftRadius: Radius.xl,
    borderBottomRightRadius: Radius.xl,
    ...Shadows.soft,
  },
});

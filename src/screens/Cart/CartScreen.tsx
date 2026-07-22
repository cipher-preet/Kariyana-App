import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import ProductGridSection from '../Home/ProductGridSection';
import CartCheckoutWrapper from './CartCheckoutWrapper';
import BillDetailsSection from './BillDetailsSection';
import DeliveryInstructionsSection from './DeliveryInstructionsSection';
import {
  useGetCartByUserIdQuery,
  useUpdateCartMutation,
} from '../../ReduxToolKit/Api/cartApi';
import { Colors, Spacing, Radius } from '../../styles';
import { CartStackParamList } from '../../navigation/CartStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLazyGetRandomProductsForCartPageQuery } from '../../ReduxToolKit/Api/productApi';
import { useSelector } from 'react-redux';
import { TruckIcon } from './CartIcons';

type NavigationProp = NativeStackNavigationProp<
  CartStackParamList,
  'CartMain'
>;

export interface UpdateCartQuantityRequest {
  userId: string;
  productId: string;
  delta: 1 | -1;
}

export interface UpdateCartQuantityResponse {
  success: boolean;
  data: {
    status: number;
    message: string;
  };
}

const CartScreen = () => {
  const isFocused = useIsFocused();
  const user_Id = useSelector((state: any) => state.auth.userId);
  const navigation = useNavigation<NavigationProp>();
  const [updateCart] = useUpdateCartMutation();
  const [updatingAction, setUpdatingAction] = React.useState<{
    productId: string;
    delta: 1 | -1;
  } | null>(null);

  const userId = user_Id;

  const { data, isLoading, refetch } = useGetCartByUserIdQuery(
    { userId },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const [
    getRandomProducts,
    { data: randomProductsData },
  ] = useLazyGetRandomProductsForCartPageQuery();

  React.useEffect(() => {
    getRandomProducts();
  }, [getRandomProducts]);

  React.useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused, refetch]);

  const handleQuantityChange = async (productId: string, delta: 1 | -1) => {
    try {
      setUpdatingAction({ productId, delta });
      await updateCart({
        userId: user_Id,
        productId,
        delta,
      }).unwrap();
      refetch();
    } catch (err) {
      console.error('Quantity update failed', err);
    } finally {
      setUpdatingAction(null);
    }
  };

  const randomProducts = randomProductsData?.data?.products ?? [];
  const items = data?.data?.items ?? [];
  const itemPresent = items.length;
  const subtotal = data?.data?.subtotal ?? 0;
  const totalItems = data?.data?.totalItems ?? 0;

  const goToHome = () => {
    navigation.getParent()?.navigate('Home', { screen: 'HomeMain' });
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    goToHome();
  };

  return (
    <CartCheckoutWrapper
      title="Checkout"
      onBackPress={handleBack}
    >
      <View style={styles.root}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.deliveryBox}>
            <View style={styles.deliveryIcon}>
              <TruckIcon />
            </View>
            <View style={styles.deliveryCopy}>
              <Text style={styles.deliveryText}>Free delivery in 24-48 hrs</Text>
              <Text style={styles.subText}>{itemPresent} items in shipment</Text>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingCard}>
              <ActivityIndicator size="small" color="#0B6B3A" />
              <Text style={styles.loadingText}>Loading cart</Text>
            </View>
          ) : itemPresent === 0 ? (
            <View style={styles.emptyCartContainer}>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptySubtitle}>
                Add products to review prices and place your order.
              </Text>

              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={goToHome}
              >
                <Text style={styles.emptyBtnText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cartContainer}>
              {items.map((item: any, index: number) => (
                <View
                  key={item.id || item.productId}
                  style={[
                    styles.cartItem,
                    index === items.length - 1 && styles.lastCartItem,
                  ]}
                >
                  <View style={styles.cartImgBox}>
                    <Image source={{ uri: item.image }} style={styles.cartImg} />
                  </View>

                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemSize} numberOfLines={1}>
                      {item.quantityPerUnit} {item.unit}
                    </Text>
                  </View>

                  <View style={styles.qtyPriceWrap}>
                    <View style={styles.qtyBox}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        disabled={updatingAction?.productId === item.productId}
                        onPress={() => handleQuantityChange(item.productId, -1)}
                        activeOpacity={0.7}
                      >
                        {updatingAction?.productId === item.productId &&
                        updatingAction?.delta === -1 ? (
                          <ActivityIndicator size="small" color={Colors.white} />
                        ) : (
                          <Text style={styles.qtyText}>-</Text>
                        )}
                      </TouchableOpacity>

                      <Text style={styles.qtyNumber}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.qtyBtn}
                        disabled={updatingAction?.productId === item.productId}
                        onPress={() => handleQuantityChange(item.productId, +1)}
                        activeOpacity={0.7}
                      >
                        {updatingAction?.productId === item.productId &&
                        updatingAction?.delta === 1 ? (
                          <ActivityIndicator size="small" color={Colors.white} />
                        ) : (
                          <Text style={styles.qtyText}>+</Text>
                        )}
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.itemPrice}>{`Rs${item.price}`}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <ProductGridSection
            title="Recommended for you"
            data={randomProducts}
          />

          <BillDetailsSection subtotal={subtotal} totalItems={totalItems} />

          <DeliveryInstructionsSection />
        </ScrollView>

        <View style={styles.orderBar}>
          <View>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalAmount}>{`Rs${subtotal}`}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.orderBtn,
              itemPresent === 0 && styles.orderBtnDisabled,
            ]}
            disabled={itemPresent === 0}
            onPress={() =>
              navigation.navigate('AddressScreen', {
                cartItems: items,
                totalAmount: subtotal,
                userId,
              })
            }
          >
            <Text style={styles.orderBtnText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CartCheckoutWrapper>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8F2',
  },

  scrollContent: {
    paddingBottom: 100,
  },

  deliveryBox: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  deliveryIcon: {
    width: 38,
    height: 38,
    borderRadius: Radius.full,
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  deliveryCopy: {
    flex: 1,
  },

  deliveryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#202124',
  },

  subText: {
    fontSize: 11,
    color: Colors.gray500,
    marginTop: 2,
    fontWeight: '600',
  },

  loadingCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    minHeight: 110,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  loadingText: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 11,
    fontWeight: '700',
  },

  cartContainer: {
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderRadius: 18,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderColor: '#F0F1F3',
  },

  lastCartItem: {
    borderBottomWidth: 0,
  },

  cartImgBox: {
    width: 62,
    height: 62,
    borderRadius: 12,
    backgroundColor: '#F5F6F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },

  cartImg: {
    width: '88%',
    height: '88%',
  },

  itemInfo: {
    flex: 1,
    paddingRight: Spacing.sm,
  },

  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#202124',
    lineHeight: 17,
  },

  itemSize: {
    fontSize: 11,
    color: Colors.gray500,
    marginTop: 3,
    fontWeight: '600',
  },

  qtyPriceWrap: {
    alignItems: 'flex-end',
  },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B6B3A',
    borderRadius: 9,
    height: 29,
  },

  qtyBtn: {
    width: 22,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    lineHeight: 21,
  },

  qtyNumber: {
    fontSize: 12,
    fontWeight: '600',
    minWidth: 22,
    textAlign: 'center',
    color: Colors.white,
  },

  itemPrice: {
    marginTop: Spacing.xs,
    fontSize: 13,
    fontWeight: '700',
    color: '#202124',
  },

  orderBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    shadowColor: '#163326',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },

  totalLabel: {
    fontSize: 11,
    color: Colors.gray500,
    fontWeight: '700',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202124',
  },

  orderBtn: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 12,
  },

  orderBtnDisabled: {
    opacity: 0.45,
  },

  orderBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },

  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl * 2,
    backgroundColor: Colors.white,
    borderRadius: 18,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#202124',
  },

  emptySubtitle: {
    fontSize: 13,
    color: Colors.gray500,
    marginTop: Spacing.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    fontWeight: '600',
  },

  emptyBtn: {
    marginTop: Spacing.lg,
    backgroundColor: '#0B6B3A',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },

  emptyBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});

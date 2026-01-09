import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { Colors, Responsive, Shadows } from '../../styles';

import AccountIcon from '../../assest/account';
import CartIcon from '../../assest/cart';
import CategoryIcon from '../../assest/category';
import HomeIcon from '../../assest/home';
import { useGetCartByUserIdQuery } from '../../ReduxToolKit/Api/cartApi';

const { scale, moderateScale, textScale } = Responsive;

const getIcon = (routeName: string, focused: boolean) => {
  const color = focused ? Colors.white : Colors.gray500;

  switch (routeName) {
    case 'Home':
      return <HomeIcon color={color} />;
    case 'categories':
      return <CategoryIcon color={color} />;
    case 'Account':
      return <AccountIcon color={color} />;
    case 'Cart':
      return <CartIcon color={color} />;
    default:
      return null;
  }
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const userId = '694fc82c88c809473e4455c3';

  const { data } = useGetCartByUserIdQuery(
    { userId },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );
  const totalItems = data?.data?.totalItems ?? 0;
  return (
    <View style={styles.tabContainer}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const progress = isFocused ? 1 : 0;

          const bubbleAnim = useAnimatedStyle(() => ({
            opacity: withTiming(interpolate(progress, [0, 1], [0, 1]), {
              duration: 250,
            }),
            transform: [
              {
                scale: withTiming(interpolate(progress, [0, 1], [0.3, 1]), {
                  duration: 250,
                }),
              },
            ],
          }));

          const iconAnim = useAnimatedStyle(() => ({
            transform: [
              {
                scale: withTiming(interpolate(progress, [0, 1], [1, 1.15]), {
                  duration: 200,
                }),
              },
            ],
          }));

          return (
            <TouchableWithoutFeedback
              key={route.key}
              onPress={() => {
                if (route.name === 'categories') {
                  navigation.navigate('categories', {
                    screen: 'categoryMain',
                  });
                } else {
                  navigation.navigate(route.name);
                }
              }}
            >
              <View style={styles.tabButton}>
                <Animated.View style={[styles.simpleGradient, bubbleAnim]}>
                  <LinearGradient
                    colors={Colors.gradients.primary}
                    style={styles.gradientFill}
                  />
                </Animated.View>

                <Animated.View style={[styles.iconWrapper, iconAnim]}>
                  {getIcon(route.name, isFocused)}

                  {route.name === 'Cart' && totalItems > 0 && (
                    <View style={styles.cartBadge}>
                      <Text style={styles.cartBadgeText}>
                        {totalItems > 99 ? '99+' : totalItems}
                      </Text>
                    </View>
                  )}
                </Animated.View>

                <Text style={[styles.label, isFocused && styles.labelActive]}>
                  {route.name}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    paddingBottom: moderateScale(12),
    ...Shadows.card,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: moderateScale(2),
  },

  tabButton: {
    width: scale(80),
    height: moderateScale(58),
    alignItems: 'center',
    justifyContent: 'center',
  },

  simpleGradient: {
    position: 'absolute',
    top: moderateScale(2),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(40),
    overflow: 'hidden',
  },

  gradientFill: {
    flex: 1,
  },

  iconWrapper: {
    width: scale(28),
    height: scale(28),
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    fontSize: textScale(10),
    color: Colors.gray500,
    marginTop: moderateScale(4),
  },

  labelActive: {
    color: Colors.primaryDark,
    fontWeight: '600',
  },

  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    backgroundColor: Colors.error || '#ff3b30',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  cartBadgeText: {
    color: Colors.white,
    fontSize: textScale(9),
    fontWeight: '700',
  },
});

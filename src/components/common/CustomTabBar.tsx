import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Colors, Shadows, Spacing } from '../../styles';

import AccountIcon from '../../assest/account';
import CartIcon from '../../assest/cart';
import CategoryIcon from '../../assest/category';
import HomeIcon from '../../assest/home';
import { useGetCartByUserIdQuery } from '../../ReduxToolKit/Api/cartApi';
import { useSelector } from 'react-redux';

const ACTIVE_GREEN = '#0B6B3A';

const getIcon = (routeName: string, focused: boolean) => {
  const color = focused ? ACTIVE_GREEN : Colors.gray500;

  switch (routeName) {
    case 'Home':
      return <HomeIcon color={color} width={22} height={22} />;
    case 'Categories':
      return <CategoryIcon color={color} width={22} height={22} />;
    case 'Account':
      return <AccountIcon color={color} width={22} height={22} />;
    case 'Cart':
      return <CartIcon color={color} width={22} height={22} />;
    default:
      return null;
  }
};

const getLabel = (routeName: string) => {
  return routeName;
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();
  const userId = useSelector((reduxState: any) => reduxState.auth.userId);

  const { data } = useGetCartByUserIdQuery(
    { userId },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const totalItems = data?.data?.totalItems ?? 0;

  const handlePress = (routeName: string) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes.find(route => route.name === routeName)?.key,
      canPreventDefault: true,
    });

    if (event.defaultPrevented) return;

    if (routeName === 'Home') {
      navigation.navigate('Home', { screen: 'HomeMain' });
      return;
    }

    if (routeName === 'Categories') {
      navigation.navigate('Categories', { screen: 'CategoriesMain' });
      return;
    }

    if (routeName === 'Account') {
      navigation.navigate('Account', { screen: 'AccountMain' });
      return;
    }

    if (routeName === 'Cart') {
      navigation.navigate('Cart', { screen: 'CartMain' });
      return;
    }

    navigation.navigate(routeName);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + Spacing.sm }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <Pressable
              key={route.key}
              onPress={() => handlePress(route.name)}
              style={({ pressed }) => [
                styles.tabButton,
                pressed && styles.pressedTab,
              ]}
            >
              <View style={styles.iconShell}>
                {(isFocused) && <View style={styles.activeCircle} />}
                {getIcon(route.name, isFocused)}

                {route.name === 'Cart' && totalItems > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>
                      {totalItems > 99 ? '99+' : totalItems}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.label, isFocused && styles.labelActive]}>
                {getLabel(route.name)}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.gray100,
    ...Shadows.soft,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabButton: {
    flex: 1,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressedTab: {
    opacity: 0.82,
  },

  iconShell: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  activeCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E9F8EE',
    borderWidth: 1,
    borderColor: '#BFE5CB',
  },

  label: {
    marginTop: 2,
    fontSize: 10.5,
    lineHeight: 13,
    color: Colors.gray500,
    fontWeight: '500',
  },

  labelActive: {
    color: ACTIVE_GREEN,
    fontWeight: '600',
  },

  cartBadge: {
    position: 'absolute',
    top: -5,
    right: 3,
    minWidth: 17,
    height: 17,
    borderRadius: 8.5,
    backgroundColor: Colors.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: Colors.white,
  },

  cartBadgeText: {
    color: Colors.white,
    fontSize: 8.5,
    fontWeight: '700',
    lineHeight: 10,
  },
});

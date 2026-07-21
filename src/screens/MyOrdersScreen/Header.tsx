import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

type HeaderProps = {
  title: string;
  backgroundColor?: string;
  onBackPress?: () => void;
};

const BackIcon = ({ color = Colors.gray900 }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18 9 12l6-6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const Header = ({
  title,
  backgroundColor = HEADER_COLORS.background,
  onBackPress,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const isLight = backgroundColor === '#fff' || backgroundColor === HEADER_COLORS.background;

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isLight ? 'dark-content' : 'light-content'}
      />

      <View
        style={[
          styles.wrap,
          {
            backgroundColor,
            paddingTop: Math.max(insets.top, Spacing.sm),
          },
        ]}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={handleBack}
            activeOpacity={0.82}
          >
            <BackIcon color={isLight ? Colors.gray900 : Colors.white} />
          </TouchableOpacity>

          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Header;

const HEADER_COLORS = {
  background: '#F6F8F2',
};

const styles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 58,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
  },

  backBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    ...Shadows.soft,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
    flex: 1,
  },
});

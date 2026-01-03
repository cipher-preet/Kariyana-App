import React from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../styles';

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  }
  return StatusBar.currentHeight || 24;
};

const HEADER_HEIGHT = 40;

interface AuthContainerProps {
  children: React.ReactNode;

  statusBarStyle?: 'light-content' | 'dark-content';
  showStatusBar?: boolean;

  scrollable?: boolean;
  contentPadding?: number;
}

const AuthContainer: React.FC<AuthContainerProps> = ({
  children,
  statusBarStyle = 'light-content',
  showStatusBar = true,
  scrollable = false,
  contentPadding = 0,
}) => {
  const Container = scrollable ? ScrollView : View;

  const headerTotalHeight = getStatusBarHeight() + HEADER_HEIGHT;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={Colors.gradients.primary} style={styles.root}>
        {showStatusBar && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={statusBarStyle}
          />
        )}

        <View style={{ height: headerTotalHeight }} />
      </LinearGradient>

      <Container
        style={styles.container}
        contentContainerStyle={
          scrollable
            ? {
                flexGrow: 1,
                paddingTop: getStatusBarHeight() + 40,
                paddingBottom: 60,
                paddingHorizontal: contentPadding,
              }
            : undefined
        }
      >
        {children}
      </Container>
    </View>
  );
};

export default AuthContainer;

/* ------------------ Styles ------------------ */
const styles = StyleSheet.create({
  root: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  container: {
    flex: 1,
  },
});

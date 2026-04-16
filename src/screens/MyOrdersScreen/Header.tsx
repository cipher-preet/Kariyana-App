import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Header = ({ title, backgroundColor = '#fff' }: any) => {
  const insets = useSafeAreaInsets();

  const isLight = backgroundColor === '#fff';

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isLight ? 'dark-content' : 'light-content'}
      />

      <View
        style={{
          backgroundColor,
          paddingTop: Math.max(insets.top - 32, 0),
        }}
      >
        <View style={[styles.container, { backgroundColor }]}>
          <TouchableOpacity style={styles.backBtn}>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },

  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  back: {
    fontSize: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
    flex: 1,
  },
});

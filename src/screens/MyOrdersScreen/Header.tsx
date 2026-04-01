import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = ({ title, backgroundColor = '#fff' }: any) => {
  const isLight = backgroundColor === '#fff';

  return (
    <>
      <StatusBar
        backgroundColor={backgroundColor}
        barStyle={isLight ? 'dark-content' : 'light-content'}
      />

      <SafeAreaView style={{ backgroundColor }}>
        <View style={[styles.container, { backgroundColor }]}>
          <TouchableOpacity>
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  back: {
    fontSize: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
  },
});

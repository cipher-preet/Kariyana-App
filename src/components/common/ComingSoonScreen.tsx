import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../screens/MyOrdersScreen/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const ComingSoonScreen = ({ navigation, title }: any) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title={title} />
      <View style={styles.container}>
        <Text style={styles.title}>Coming Soon</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation?.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ComingSoonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#111',
  },

  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#111',
  },

  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

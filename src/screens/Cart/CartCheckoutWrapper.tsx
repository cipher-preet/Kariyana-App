import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  title: string;
  onBackPress: () => void;
  children: React.ReactNode;
}

const CartCheckoutWrapper: React.FC<Props> = ({
  title,
  onBackPress,
  children,
}) => {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={onBackPress}
            activeOpacity={0.7}
            style={styles.backBtn}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>

          <Text style={styles.title}>{title}</Text>

          {/* Right spacer to keep title centered */}
          <View style={styles.rightSpacer} />
        </View>

        {/* Content */}
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default CartCheckoutWrapper;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },

  backBtn: {
    width: 32,
    justifyContent: 'center',
  },

  backArrow: {
    fontSize: 22,
    fontWeight: '700',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },

  rightSpacer: {
    width: 32,
  },

  content: {
    flex: 1,
  },
});

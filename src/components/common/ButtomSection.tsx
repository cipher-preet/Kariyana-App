import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Spacing, Typography } from '../../styles';

const BottomBrandSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.bigText}>
        Your shop’s trusted vendor {'\n'}
        quality products {'\n'}
        at low prices ❤️
      </Text>

      <Text style={styles.watermark}>Karyana</Text>
    </View>
  );
};

export default BottomBrandSection;

/* ───────────────────────────── */
/* STYLES (SAME VISUAL OUTPUT)   */
/* ───────────────────────────── */

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.gray100,
    paddingVertical: Spacing.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.xxl,
  },

  bigText: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.gray300,
    textAlign: 'center',
    lineHeight: 40,
  },

  watermark: {
    marginTop: Spacing.xxxl,
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray200,
    opacity: 0.35,
  },
});

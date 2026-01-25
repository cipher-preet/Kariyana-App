import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../styles';

interface StepIndicatorProps {
  step: number;
  total: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < step ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>

      <Text style={styles.text}>
        Step {step} of {total}
      </Text>
    </View>
  );
};

export default StepIndicator;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: Spacing.md,
  },

  dotsRow: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },

  activeDot: {
    backgroundColor: Colors.primary,
  },

  inactiveDot: {
    backgroundColor: Colors.gray300,
  },

  text: {
    fontSize: 13,
    color: Colors.gray600,
  },
});

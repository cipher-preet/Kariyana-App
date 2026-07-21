import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors, Radius, Spacing } from '../../styles';

const DOT_SIZE = 18;
const ACTIVE_GREEN = '#0B6B3A';

const CheckIcon = ({ color = Colors.white }) => (
  <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
    <Path
      d="m7 12 3 3 7-7"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const VerticalProgress = ({ steps, currentStep }: any) => {
  return (
    <View style={styles.container}>
      {steps.map((step: any, index: number) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isActive = index <= currentStep;

        return (
          <View key={step.title || index} style={styles.row}>
            <View style={styles.left}>
              <View
                style={[
                  styles.dot,
                  isActive && styles.activeDot,
                  isCurrent && styles.currentDot,
                ]}
              >
                {isCompleted ? <CheckIcon /> : null}
              </View>

              {index !== steps.length - 1 && (
                <View style={[styles.line, isCompleted && styles.activeLine]} />
              )}
            </View>

            <View style={styles.content}>
              <Text style={[styles.title, isActive && styles.activeTitle]}>
                {step.title}
              </Text>
              {step.date ? <Text style={styles.date}>{step.date}</Text> : null}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default VerticalProgress;

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.md,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  left: {
    width: 30,
    alignItems: 'center',
  },

  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: Radius.full,
    backgroundColor: Colors.gray200,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeDot: {
    backgroundColor: ACTIVE_GREEN,
  },

  currentDot: {
    borderWidth: 3,
    borderColor: '#BFE5CB',
  },

  line: {
    width: 2,
    height: 28,
    backgroundColor: Colors.gray200,
    marginTop: 3,
  },

  activeLine: {
    backgroundColor: ACTIVE_GREEN,
  },

  content: {
    flex: 1,
    paddingBottom: Spacing.md,
  },

  title: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.gray500,
  },

  activeTitle: {
    color: Colors.gray900,
    fontWeight: '600',
  },

  date: {
    fontSize: 11,
    color: Colors.gray500,
    marginTop: 2,
    fontWeight: '500',
  },
});

import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const DOT_SIZE = 14;

const VerticalProgress = ({ steps, currentStep }: any) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: currentStep,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  return (
    <View style={styles.container}>
      {steps.map((step: any, index: number) => {
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;

        return (
          <View key={index} style={styles.row}>
            <View style={styles.left}>
              <View
                style={[
                  styles.dot,
                  isActive && styles.activeDot,
                  isCurrent && styles.currentDot,
                ]}
              />

              {index !== steps.length - 1 && (
                <View style={[styles.line, isActive && styles.activeLine]} />
              )}
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{step.title}</Text>
              <Text style={styles.date}>{step.date}</Text>
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
    paddingVertical: 10,
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
    borderRadius: DOT_SIZE / 2,
    backgroundColor: '#E5E7EB',
  },

  activeDot: {
    backgroundColor: '#16A34A',
  },

  currentDot: {
    borderWidth: 2,
    borderColor: '#16A34A',
    backgroundColor: '#fff',
  },

  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E5E7EB',
    marginTop: 2,
  },

  activeLine: {
    backgroundColor: '#16A34A',
  },

  content: {
    flex: 1,
    paddingBottom: 20,
  },

  title: {
    fontSize: 14,
    fontWeight: '600',
  },

  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
});

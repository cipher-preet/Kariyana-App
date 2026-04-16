import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../styles';

interface Props {
  title: string;
  large?: boolean;
}

const SectionTitle: React.FC<Props> = ({ title, large }) => {
  return <Text style={[styles.text, large && styles.large]}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    borderBottomWidth: 0.6,
    borderBottomColor: 'rgba(0,0,0,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
  },

  large: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.black,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
});

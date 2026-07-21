import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../styles';

interface Props {
  title: string;
}

const SectionTitle: React.FC<Props> = ({ title }) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default SectionTitle;

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 2,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray600,
    textTransform: 'uppercase',
  },
});

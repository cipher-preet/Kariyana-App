import React from 'react';
import { Text, StyleSheet } from 'react-native';

import {
  Colors,
  Spacing,
} from '../../styles';

interface Props {
  title: string;
  large?: boolean;
}

const SectionTitle: React.FC<Props> = ({ title, large }) => {
  return (
    <Text
      style={[
        styles.text,
        large && styles.large,
      ]}
    >
      {title}
    </Text>
  );
};

export default SectionTitle;


const styles = StyleSheet.create({
  text: {
    paddingHorizontal: Spacing.lg,   
    paddingVertical: Spacing.md,     
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray600,           
  },

  large: {
    fontSize: 20,
    color: Colors.gray900,          
    paddingVertical: 0,             
  },
});

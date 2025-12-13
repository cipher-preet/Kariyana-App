import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import WrapperContainer from '../../components/common/WrapperContainer/WrapperContainer';
import CategoryGrid from './CategoryGrid';

import {
  Colors,
  Spacing,
  Typography,
} from '../../styles';

const CategoriesScreen = () => {
  return (
    <WrapperContainer title="Categories">
      {/* IMPORTANT: use full width */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.sectionTitle}>Grocery & Kitchen</Text>
        <CategoryGrid />

        <Text style={styles.sectionTitle}>Snacks & Drinks</Text>
        <CategoryGrid />

        <Text style={styles.sectionTitle}>Kariyana items</Text>
        <CategoryGrid />
      </ScrollView>
    </WrapperContainer>
  );
};

export default CategoriesScreen;


const styles = StyleSheet.create({
  content: {
    width: '100%',                
    paddingBottom: Spacing.xxxl,   
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.gray900,
    marginHorizontal: Spacing.lg,  
    marginVertical: Spacing.lg,
  },
});

import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
  Shadows,
} from '../../../styles';

import SearchBar from '../../../screens/Home/SearchBar';

const getStatusBarHeight = () => {
  return Platform.OS === 'ios'
    ? 44
    : StatusBar.currentHeight || 24;
};

interface WrapperProps {
  title?: string;
  children: React.ReactNode;
}

const WrapperContainer: React.FC<WrapperProps> = ({ children }) => {
  const statusBarHeight = getStatusBarHeight();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View
        style={[
          styles.header,
          { paddingTop: statusBarHeight + Spacing.md },
        ]}
      />

      {/* SEARCH BAR FLOAT */}
      <View style={styles.searchBar}>
        <SearchBar />
      </View>

      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentScroll}
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default WrapperContainer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  header: {
    width: '100%',
    height: 120,                         
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: Radius.xl,   
    borderBottomRightRadius: Radius.xl,  
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.lg,           
    elevation: 4,                        
  },

  searchBar: {
    position: 'absolute',
    top: 60,                            
    left: Spacing.xl,                    
    right: Spacing.xl,                   
    height: 50,                          
    ...Shadows.soft,                     
  },

  contentScroll: {
    paddingTop: Spacing.md,              
    paddingHorizontal: Spacing.lg,       
    paddingBottom: Spacing.xxxl,         
  },
});

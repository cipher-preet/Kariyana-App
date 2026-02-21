import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
} from '../../styles';

type Props = {
  title?: string;
  onPress?: () => void;
};

const SeeAllSection: React.FC<Props> = ({
  title = 'See all products',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.inner}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
          }}
          style={styles.icon}
        />

        <Text style={styles.text}>{title}</Text>

        <Text style={styles.arrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SeeAllSection;


const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,      
    marginBottom: Spacing.xl,        
    marginTop: Spacing.md,             
  },

  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F9F8F3',       
    borderRadius: Radius.sm,           
    height: 32,                        
    borderWidth: 1,
    borderColor: '#E5E3DA',            
  },

  icon: {
    width: 18,
    height: 18,
    borderRadius: Radius.sm,           
    marginRight: Spacing.md,           
  },

  text: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.gray900,
  },

  arrow: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: Spacing.md,           
    color: Colors.gray900,
    marginTop: -2,                     
  },
});

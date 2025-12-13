import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
} from '../../styles';

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>Preet Kumar</Text>
        <Text style={styles.email}>ps1535146@gmail.com</Text>
      </View>

      <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
        <Text style={styles.editIcon}>✎</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',                    
    backgroundColor: Colors.white,
    padding: Spacing.lg,              
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray900,
  },

  email: {
    fontSize: 13,
    color: Colors.gray500,            
    marginTop: Spacing.xs,            
  },

  editBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.lg,      
    backgroundColor: Colors.success + '20', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  editIcon: {
    color: Colors.success,            
    fontSize: 14,
    fontWeight: '600',
  },
});

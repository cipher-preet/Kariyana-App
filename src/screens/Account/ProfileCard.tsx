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
  Radius
} from '../../styles';
import { useSelector } from 'react-redux';
import { useGetPersonalInformationByUserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';

const ProfileCard = () => {
  const user_Id = useSelector((state: any) => state.auth.userId);
  const { data, isLoading, isError } = useGetPersonalInformationByUserIdQuery({
    userId: user_Id,
  });
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Error loading data</Text>;
  }
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{data.data.ownerName}</Text>
        <Text style={styles.email}>{data.data.shopName}</Text>
      </View>

      {/* <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
        <Text style={styles.editIcon}>{data?.data?.tenureOfShop}</Text>
      </TouchableOpacity> */}
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
    width: 42,
    height: 42,
    borderRadius: Radius.lg,      
    backgroundColor: Colors.success + '20', 
    alignItems: 'center',
    justifyContent: 'center',
  },

  editIcon: {
    color: Colors.success,            
    fontSize: 10,
    fontWeight: '600',
  },
});

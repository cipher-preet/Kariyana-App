import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';
import { useSelector } from 'react-redux';
import { useGetPersonalInformationByUserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';

const ProfileCard = () => {
  const user_Id = useSelector((state: any) => state.auth.userId);
  const { data, isLoading, isError } = useGetPersonalInformationByUserIdQuery({
    userId: user_Id,
  });

  const ownerName = data?.data?.ownerName || 'Kariyana Partner';
  const shopName = data?.data?.shopName || 'Wholesale buyer account';
  const initials = ownerName
    .split(' ')
    .map((part: string) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{isLoading ? '..' : initials}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {isError ? 'Account details unavailable' : ownerName}
        </Text>
        <Text style={styles.email} numberOfLines={1}>
          {isLoading ? 'Loading profile' : shopName}
        </Text>
      </View>

      <View style={styles.statusPill}>
        <Text style={styles.statusText}>Active</Text>
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: Radius.full,
    backgroundColor: '#EAF6EE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#0B6B3A',
    fontSize: 15,
    fontWeight: '700',
  },

  info: {
    flex: 1,
    marginLeft: Spacing.md,
    marginRight: Spacing.sm,
  },

  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#202124',
  },

  email: {
    fontSize: 11.5,
    color: Colors.gray500,
    marginTop: 3,
    fontWeight: '600',
  },

  statusPill: {
    backgroundColor: '#F7CB14',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
  },

  statusText: {
    color: '#0B6B3A',
    fontSize: 10,
    fontWeight: '600',
  },
});

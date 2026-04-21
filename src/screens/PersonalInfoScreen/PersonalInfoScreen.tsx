import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../MyOrdersScreen/Header';
import { useGetPersonalInformationByUserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';
import { useSelector } from 'react-redux';

const PersonalInfoScreen = () => {
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

  const ProfileData = data.data;

  const formatDate = (date: string) => new Date(date).toDateString();

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Profile" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            {ProfileData.documents ? (
              <Image
                source={{ uri: ProfileData.documents }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>
                {ProfileData.shopName.charAt(0)}
              </Text>
            )}
          </View>

          <Text style={styles.name}>{ProfileData.ownerName}</Text>
          <Text style={styles.subText}>{ProfileData.shopName}</Text>

          <View style={styles.statsRow}>
            <StatItem label="Type" value={ProfileData.Type} />
            <StatItem label="Tenure" value={ProfileData.tenureOfShop} />
            <StatItem label="Phone" value="Available" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Owner of {ProfileData.shopName}. Running a {ProfileData.Type} shop
            located in {ProfileData.address}. Experience of{' '}
            {ProfileData.tenureOfShop}.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Details</Text>

          <InfoRow
            label="Shop Register"
            value={formatDate(ProfileData.dateofRegister)}
          />
          <InfoRow label="Address" value={ProfileData.address} />
          <InfoRow label="Phone" value={ProfileData.phone} />
          <InfoRow
            label="Date of Birth"
            value={formatDate(ProfileData.dateofbirth)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const StatItem = ({ label, value }: any) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const InfoRow = ({ label, value }: any) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    paddingBottom: 24,
  },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  avatarWrapper: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatarText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
  },

  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    justifyContent: 'space-between',
    width: '80%',
  },

  statItem: {
    alignItems: 'center',
  },

  statValue: {
    fontWeight: '700',
    fontSize: 14,
    color: '#111',
  },

  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 2,
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111',
  },

  aboutText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },

  label: {
    fontSize: 13,
    color: '#777',
  },

  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111',
  },

  document: {
    width: '100%',
    height: 170,
    borderRadius: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 44,
  },
});

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { Colors, Spacing } from '../../styles';

import ProfileCard from './ProfileCard';
import QuickActions from './QuickActions';
import AccountRow from './AccountRow';
import SectionTitle from './SectionTitle';
import { useNavigation } from '@react-navigation/native';
import Header from '../MyOrdersScreen/Header';

const AccountScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <View style={styles.fixedHeader}>
        <Header title="My Account" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProfileCard />
        <QuickActions />

        <AccountRow title="Personal Information" onPress={() => navigation.navigate('PersonalInfoScreen')} />

        <AccountRow
          title="FAQ's"
          onPress={() => navigation.navigate('FaqsScreen')}
        />

        <AccountRow
          title="Delete AmbeMart Account"
          onPress={() => navigation.navigate('DeleteAccountScreen')}
        />

        <SectionTitle title="Enquiries" />

        <AccountRow
          title="Become A Partner"
          onPress={() => navigation.navigate('BecameAPartnerScreen')}
        />
        <AccountRow
          title="Share App Feedback"
          onPress={() => navigation.navigate('ShareFeedBackScreen')}
        />

        <View style={styles.footer}>
          <AccountRow
            title="Privacy Policy"
            noBorder
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
          />
          <AccountRow title="Log Out" highlight />
          <AccountRow title="App Version 5.1.9" disabled noArrow />
        </View>
      </ScrollView>
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.gray50,
  },

  fixedHeader: {
    paddingTop: 46,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    backgroundColor: '#ffffffc4',
    zIndex: 10,
  },

  content: {
    paddingBottom: Spacing.xxxl,
  },

  footer: {
    marginTop: Spacing.md,
  },
});

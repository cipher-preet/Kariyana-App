import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import { Colors, Spacing } from '../../styles';

import ProfileCard from './ProfileCard';
import QuickActions from './QuickActions';
import AccountRow from './AccountRow';
import SectionTitle from './SectionTitle';

const AccountScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.fixedHeader}>
        <SectionTitle title="My Account" large />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProfileCard />
        <QuickActions />

        <AccountRow title="Personal Information" />
        <AccountRow title="FAQ's" />
        <AccountRow title="Delete AmbeMart Account" />

        <SectionTitle title="Enquiries" />

        <AccountRow title="Become A Partner" />
        <AccountRow title="Share App Feedback" />

        <View style={styles.footer}>
          <AccountRow title="Privacy Policy" noBorder />
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
    backgroundColor: '#EEF1E5',
    zIndex: 10,
  },

  content: {
    paddingBottom: Spacing.xxxl,
  },

  footer: {
    marginTop: Spacing.md,
  },
});

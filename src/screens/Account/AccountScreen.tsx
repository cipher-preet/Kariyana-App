import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {
  Colors,
  Spacing,
} from '../../styles';

import ProfileCard from './ProfileCard';
import QuickActions from './QuickActions';
import AccountRow from './AccountRow';
import SectionTitle from './SectionTitle';

const AccountScreen = () => {
  return (
    <View style={styles.root}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <SectionTitle title="My Account" large />
        </View>

        {/* BODY */}
        <ProfileCard />
        <QuickActions />

        <AccountRow title="fnpCash" rightText="₹0" badge="New" />
        <AccountRow title="Personal Information" />
        <AccountRow title="FAQ's" />
        <AccountRow title="Delete FNP Account" />
        <AccountRow title="Notification Settings" />

        <SectionTitle title="Enquiries" />

        <AccountRow title="Birthday/ Wedding Decor" />
        <AccountRow title="Corporate Gifts/ Bulk Orders" />
        <AccountRow title="Become A Partner" />
        <AccountRow title="Start An FNP Franchise" />
        <AccountRow title="Share App Feedback" />

        {/* FOOTER */}
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
    width: '100%',                  
    backgroundColor: Colors.gray50, 
  },

  content: {
    width: '100%',                  
    paddingBottom: Spacing.xxxl,
  },

  header: {
    paddingTop: Spacing.xxxl,     
    paddingHorizontal: Spacing.lg,  
    paddingBottom: Spacing.lg,
    backgroundColor: '#EEF1E5',    
  },

  footer: {
    marginTop: Spacing.md,
  },
});

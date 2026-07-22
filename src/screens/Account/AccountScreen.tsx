import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Colors, Spacing } from '../../styles';

import ProfileCard from './ProfileCard';
import QuickActions from './QuickActions';
import AccountRow from './AccountRow';
import SectionTitle from './SectionTitle';
import { useNavigation } from '@react-navigation/native';
import {
  FeedbackIcon,
  HelpIcon,
  PartnerIcon,
  ShieldIcon,
  UserIcon,
} from './AccountIcons';

const HEADER_COLORS = {
  page: '#F6F8F2',
  hero: '#0B6B3A',
  heroDark: '#07512E',
};

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    return 44;
  }
  return StatusBar.currentHeight || 24;
};

const BackIcon = ({ color = Colors.white }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18 9 12l6-6"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const statusBarHeight = getStatusBarHeight();

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.getParent()?.navigate('Home', { screen: 'HomeMain' });
  };

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={HEADER_COLORS.hero} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.md }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.82}
            onPress={handleBack}
          >
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.headerCopy}>
            <Text style={styles.headerLabel}>Account</Text>
            <Text style={styles.headerTitle}>Manage your business profile</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProfileCard />
        <QuickActions />

        <SectionTitle title="Account settings" />
        <View style={styles.group}>
          <AccountRow
            title="Personal Information"
            icon={<UserIcon />}
            onPress={() => navigation.navigate('PersonalInfoScreen')}
          />
          <AccountRow
            title="FAQ's"
            icon={<HelpIcon />}
            noBorder
            onPress={() => navigation.navigate('FaqsScreen')}
          />
        </View>

        <SectionTitle title="Enquiries" />
        <View style={styles.group}>
          <AccountRow
            title="Become A Partner"
            icon={<PartnerIcon />}
            onPress={() => navigation.navigate('BecameAPartnerScreen')}
          />
          <AccountRow
            title="Share App Feedback"
            icon={<FeedbackIcon />}
            noBorder
            onPress={() => navigation.navigate('ShareFeedBackScreen')}
          />
        </View>

        <SectionTitle title="Security and app" />
        <View style={styles.group}>
          <AccountRow
            title="Privacy Policy"
            icon={<ShieldIcon />}
            onPress={() => navigation.navigate('PrivacyPolicyScreen')}
          />
          <AccountRow
            title="Delete AmbeMart Account"
            icon={<ShieldIcon color={Colors.error} />}
            onPress={() => navigation.navigate('DeleteAccountScreen')}
          />
          <AccountRow title="Log Out" highlight />
          <AccountRow title="App Version 5.1.9" disabled noArrow noBorder />
        </View>
      </ScrollView>
    </View>
  );
};
export default AccountScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HEADER_COLORS.page,
  },

  header: {
    backgroundColor: HEADER_COLORS.hero,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    shadowColor: HEADER_COLORS.heroDark,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  headerCopy: {
    flex: 1,
  },

  headerLabel: {
    color: 'rgba(255,255,255,0.78)',
    fontSize: 10.5,
    fontWeight: '600',
  },

  headerTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
    marginTop: 1,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },

  group: {
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderRadius: 18,
    marginBottom: Spacing.md,
  },
});

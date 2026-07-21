import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { useGetPersonalInformationByUserIdQuery } from '../../ReduxToolKit/Api/accountPageApi';
import { useSelector } from 'react-redux';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

const PAGE_BG = '#F7F8FA';
const BRAND_GREEN = '#0B6B3A';
const BORDER = '#E7EAEE';

const fallback = (value?: string | null) => value || 'Not available';

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') return 44;
  return StatusBar.currentHeight || 24;
};

const formatDate = (date?: string | null) => {
  if (!date) {
    return 'Not available';
  }

  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'Not available';
  }

  return parsedDate.toDateString();
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

const PersonalInfoScreen = () => {
  const navigation = useNavigation<any>();
  const statusBarHeight = getStatusBarHeight();
  const user_Id = useSelector((state: any) => state.auth.userId);
  const { data, isLoading, isError } = useGetPersonalInformationByUserIdQuery(
    {
      userId: user_Id,
    },
    { skip: !user_Id },
  );

  if (isLoading) {
    return (
      <View style={styles.root}>
        <ScreenHeader statusBarHeight={statusBarHeight} />
        <View style={styles.centerState}>
          <ActivityIndicator size="large" color={BRAND_GREEN} />
          <Text style={styles.stateTitle}>Loading profile</Text>
          <Text style={styles.stateText}>Getting your account details ready.</Text>
        </View>
      </View>
    );
  }

  if (isError || !data?.data) {
    return (
      <View style={styles.root}>
        <ScreenHeader statusBarHeight={statusBarHeight} />
        <View style={styles.centerState}>
          <View style={styles.stateIcon}>
            <Text style={styles.stateIconText}>!</Text>
          </View>
          <Text style={styles.stateTitle}>Profile unavailable</Text>
          <Text style={styles.stateText}>
            We could not load your personal information right now.
          </Text>
        </View>
      </View>
    );
  }

  const profileData = data.data;
  const ownerName = fallback(profileData.ownerName);
  const shopName = fallback(profileData.shopName);
  const profession = fallback(profileData.Type);
  const initials =
    ownerName !== 'Not available'
      ? ownerName
          .split(' ')
          .map((part: string) => part[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'AM';

  return (
    <View style={styles.root}>
      <StatusBar backgroundColor={BRAND_GREEN} barStyle="light-content" />
      <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.sm }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.82}
          onPress={() => navigation.goBack()}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.headerCopy}>
          <Text style={styles.headerTitle}>Personal Information</Text>
          <Text style={styles.headerSubtitle}>Verified business profile</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profilePanel}>
          <View style={styles.avatarWrapper}>
            {profileData.documents ? (
              <Image
                source={{ uri: profileData.documents }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>{initials}</Text>
            )}
          </View>

          <View style={styles.identity}>
            <Text style={styles.name} numberOfLines={1}>
              {ownerName}
            </Text>
            <Text style={styles.subText} numberOfLines={1}>
              {shopName}
            </Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>Active account</Text>
            </View>
          </View>
        </View>

        <View style={styles.summaryPanel}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Profession</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {profession}
            </Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Tenure</Text>
            <Text style={styles.summaryValue} numberOfLines={1}>
              {fallback(profileData.tenureOfShop)}
            </Text>
          </View>
        </View>

        <InfoSection title="Owner Details">
          <InfoRow label="Owner Name" value={ownerName} />
          <InfoRow label="Phone" value={fallback(profileData.phone)} />
          <InfoRow
            label="Date of Birth"
            value={formatDate(profileData.dateofbirth)}
            noBorder
          />
        </InfoSection>

        <InfoSection title="Business Details">
          <InfoRow label="Shop Name" value={shopName} />
          <InfoRow label="Profession" value={profession} />
          <InfoRow label="Tenure" value={fallback(profileData.tenureOfShop)} />
          <InfoRow
            label="Registered On"
            value={formatDate(profileData.dateofRegister)}
          />
          <InfoRow
            label="Address"
            value={fallback(profileData.address)}
            noBorder
            multiline
          />
        </InfoSection>
      </ScrollView>
    </View>
  );
};

const ScreenHeader = ({ statusBarHeight }: { statusBarHeight: number }) => (
  <>
    <StatusBar backgroundColor={BRAND_GREEN} barStyle="light-content" />
    <View style={[styles.header, { paddingTop: statusBarHeight + Spacing.sm }]}>
      <View style={styles.backButtonPlaceholder} />
      <View style={styles.headerCopy}>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <Text style={styles.headerSubtitle}>Verified business profile</Text>
      </View>
    </View>
  </>
);

const InfoSection = ({ title, children }: any) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
);

const InfoRow = ({ label, value, noBorder, multiline }: any) => (
  <View style={[styles.row, noBorder && styles.noBorder]}>
    <Text style={styles.label}>{label}</Text>
    <Text
      style={[styles.value, multiline && styles.multilineValue]}
      numberOfLines={multiline ? undefined : 1}
    >
      {value}
    </Text>
  </View>
);

export default PersonalInfoScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

  header: {
    minHeight: 104,
    backgroundColor: BRAND_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.lg,
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  backButtonPlaceholder: {
    width: 36,
    height: 36,
    marginRight: Spacing.sm,
  },

  headerCopy: {
    flex: 1,
  },

  headerTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },

  headerSubtitle: {
    color: 'rgba(255,255,255,0.76)',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },

  container: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xxxl,
  },

  centerState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },

  stateIcon: {
    width: 58,
    height: 58,
    borderRadius: Radius.full,
    backgroundColor: '#FFF1EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  stateIconText: {
    color: Colors.error,
    fontSize: 24,
    fontWeight: '800',
  },

  stateTitle: {
    marginTop: Spacing.md,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.gray900,
  },

  stateText: {
    marginTop: Spacing.xs,
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },

  profilePanel: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    padding: Spacing.md,
    marginTop: -Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.card,
  },

  avatarWrapper: {
    width: 58,
    height: 58,
    borderRadius: Radius.full,
    backgroundColor: '#EAF6EE',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: Spacing.md,
  },

  avatarText: {
    color: BRAND_GREEN,
    fontSize: 18,
    fontWeight: '700',
  },

  identity: {
    flex: 1,
    minWidth: 0,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.gray900,
  },

  subText: {
    fontSize: 12.5,
    color: Colors.gray500,
    marginTop: 4,
    fontWeight: '600',
  },

  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EAF6EE',
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    marginTop: Spacing.sm,
  },

  statusText: {
    color: BRAND_GREEN,
    fontSize: 11,
    fontWeight: '700',
  },

  summaryPanel: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  summaryItem: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },

  summaryDivider: {
    width: 1,
    backgroundColor: BORDER,
  },

  summaryLabel: {
    fontSize: 11,
    color: Colors.gray500,
    fontWeight: '600',
  },

  summaryValue: {
    color: Colors.gray900,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 5,
  },

  section: {
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray600,
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: Spacing.sm,
  },

  sectionBody: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    gap: Spacing.md,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  label: {
    fontSize: 13,
    color: Colors.gray500,
    fontWeight: '600',
    flex: 0.38,
  },

  value: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray900,
    flex: 0.62,
    textAlign: 'right',
  },

  multilineValue: {
    lineHeight: 19,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },
});

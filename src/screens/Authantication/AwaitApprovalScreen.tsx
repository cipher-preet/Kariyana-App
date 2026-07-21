import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors, Radius, Spacing } from '../../styles';
import {
  moderateScale,
  moderateScaleVertical,
} from '../../styles/responsiveStyles';

const AwaitingApproval = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.container.backgroundColor}
        translucent={false}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroArea}>
          <View style={styles.greenOrb} />
          <View style={styles.orangeOrb} />
          <View style={styles.deepCurve} />
          <View style={styles.statusPreview}>
            <View style={styles.previewBadge}>
              <View style={styles.previewCheckStem} />
              <View style={styles.previewCheckArm} />
            </View>
            <View style={styles.previewLineShort} />
            <View style={styles.previewLine} />
            <View style={styles.previewProgress}>
              <View style={styles.previewProgressFill} />
            </View>
            <View style={styles.previewButton} />
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.eyebrow}>Registration submitted</Text>
          <Text style={styles.title}>Approval pending</Text>
          <Text style={styles.subtitle}>
            Your shop details are with our verification team. This usually takes
            a few hours.
          </Text>

          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Text style={styles.statusIconText}>1</Text>
            </View>
            <View style={styles.statusContent}>
              <Text style={styles.statusTitle}>Review in progress</Text>
              <Text style={styles.statusText}>
                We will notify you once your Kariyana account is approved.
              </Text>
            </View>
          </View>

          <TouchableOpacity activeOpacity={0.86} style={styles.cta}>
            <Text style={styles.ctaText}>Okay, I understand</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            You can safely close the app and come back later.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AwaitingApproval;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: moderateScaleVertical(34),
  },

  heroArea: {
    minHeight: moderateScaleVertical(286),
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
    overflow: 'hidden',
  },

  greenOrb: {
    position: 'absolute',
    top: moderateScaleVertical(52),
    left: moderateScale(44),
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: '#0F5A20',
  },

  orangeOrb: {
    position: 'absolute',
    right: moderateScale(48),
    bottom: moderateScaleVertical(30),
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: Colors.secondary,
  },

  deepCurve: {
    position: 'absolute',
    width: moderateScale(400),
    height: moderateScale(400),
    borderRadius: moderateScale(200),
    backgroundColor: '#124F20',
    right: moderateScale(-150),
    bottom: moderateScaleVertical(-150),
    opacity: 0.96,
  },

  statusPreview: {
    alignSelf: 'flex-end',
    width: moderateScale(178),
    minHeight: moderateScaleVertical(222),
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    padding: moderateScale(18),
    marginRight: moderateScale(10),
    marginBottom: moderateScaleVertical(10),
    shadowColor: Colors.black,
    shadowOpacity: 0.18,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 14 },
    elevation: 12,
  },

  previewBadge: {
    width: moderateScale(52),
    height: moderateScale(52),
    borderRadius: moderateScale(26),
    backgroundColor: '#E7F5EC',
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(18),
  },

  previewCheckStem: {
    position: 'absolute',
    width: moderateScale(10),
    height: moderateScale(4),
    borderRadius: Radius.full,
    backgroundColor: '#0F5A20',
    left: moderateScale(16),
    top: moderateScale(28),
    transform: [{ rotate: '45deg' }],
  },

  previewCheckArm: {
    position: 'absolute',
    width: moderateScale(22),
    height: moderateScale(4),
    borderRadius: Radius.full,
    backgroundColor: '#0F5A20',
    left: moderateScale(23),
    top: moderateScale(25),
    transform: [{ rotate: '-45deg' }],
  },

  previewLineShort: {
    width: '58%',
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.gray800,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(8),
  },

  previewLine: {
    width: '76%',
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.gray200,
    alignSelf: 'center',
    marginBottom: moderateScaleVertical(20),
  },

  previewProgress: {
    height: moderateScaleVertical(8),
    borderRadius: Radius.full,
    backgroundColor: Colors.gray100,
    marginBottom: moderateScaleVertical(24),
  },

  previewProgressFill: {
    width: '68%',
    height: '100%',
    borderRadius: Radius.full,
    backgroundColor: Colors.secondary,
  },

  previewButton: {
    height: moderateScaleVertical(34),
    borderRadius: Radius.lg,
    backgroundColor: '#0F5A20',
  },

  body: {
    paddingHorizontal: Spacing.xl,
    paddingTop: moderateScaleVertical(24),
    paddingBottom: Spacing.xl,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondaryDark,
    textTransform: 'uppercase',
    marginBottom: moderateScaleVertical(10),
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.gray900,
    marginBottom: moderateScaleVertical(8),
  },

  subtitle: {
    fontSize: 14,
    color: Colors.gray600,
    lineHeight: 21,
    marginBottom: moderateScaleVertical(24),
    maxWidth: '92%',
  },

  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: Radius.xl,
    backgroundColor: Colors.white,
    padding: moderateScale(16),
    marginBottom: moderateScaleVertical(24),
    shadowColor: Colors.black,
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  statusIcon: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: '#E7F5EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },

  statusIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F5A20',
  },

  statusContent: {
    flex: 1,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.gray900,
    marginBottom: moderateScaleVertical(4),
  },

  statusText: {
    fontSize: 13,
    color: Colors.gray600,
    lineHeight: 19,
  },

  cta: {
    height: moderateScaleVertical(56),
    borderRadius: Radius.xl,
    backgroundColor: '#0F5A20',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#0F5A20',
    shadowOpacity: 0.26,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },

  ctaText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },

  footerText: {
    marginTop: moderateScaleVertical(18),
    fontSize: 12,
    color: Colors.gray500,
    lineHeight: 18,
    textAlign: 'center',
  },
});

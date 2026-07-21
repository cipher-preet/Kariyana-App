import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Header from '../../screens/MyOrdersScreen/Header';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

type ComingSoonProps = {
  title: string;
};

const SoonIcon = ({ color = '#0B6B3A' }) => (
  <Svg width={42} height={42} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={8.5} stroke={color} strokeWidth={1.8} />
    <Path
      d="M12 7.5v5l3.2 1.9"
      stroke={color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const getMessage = (title: string) => {
  switch (title) {
    case 'Analytics':
      return 'Business insights and order performance tools are being prepared.';
    case 'Help Center':
      return 'Support articles, contact options, and issue tracking will be available here.';
    case 'Became a Partner':
      return 'Partner onboarding and business collaboration options are coming soon.';
    case 'Delete Account':
      return 'A secure account deletion flow is being prepared for this page.';
    default:
      return 'This section is being prepared and will be available soon.';
  }
};

const ComingSoonScreen = ({ title }: ComingSoonProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.root}>
      <Header title={title} />

      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <SoonIcon />
          </View>

          <Text style={styles.title}>Coming Soon</Text>
          <Text style={styles.description}>{getMessage(title)}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
            activeOpacity={0.84}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ComingSoonScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F8F2',
  },

  content: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xl,
    justifyContent: 'center',
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxxl,
    alignItems: 'center',
    ...Shadows.soft,
  },

  iconWrap: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#E9F8EE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.gray900,
  },

  description: {
    marginTop: Spacing.sm,
    color: Colors.gray600,
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
    textAlign: 'center',
  },

  button: {
    marginTop: Spacing.xl,
    minWidth: 112,
    height: 42,
    borderRadius: Radius.md,
    backgroundColor: '#0B6B3A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

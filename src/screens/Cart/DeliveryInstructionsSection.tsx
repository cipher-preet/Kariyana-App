import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Radius } from '../../styles';
import { BellOffIcon, MicIcon, PhoneOffIcon } from './CartIcons';

const DeliveryInstructionsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery instructions</Text>

      <View style={styles.row}>
        <InstructionCard
          icon={<MicIcon />}
          title="Record"
          subtitle="Voice note"
        />
        <InstructionCard
          icon={<PhoneOffIcon />}
          title="Avoid calls"
          subtitle="Message only"
        />
        <InstructionCard
          icon={<BellOffIcon />}
          title="No bell"
          subtitle="Leave quietly"
        />
      </View>
    </View>
  );
};

export default DeliveryInstructionsSection;

interface InstructionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

const InstructionCard: React.FC<InstructionCardProps> = ({
  icon,
  title,
  subtitle,
}) => (
  <TouchableOpacity activeOpacity={0.84} style={styles.card}>
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.cardTitle} numberOfLines={1}>
      {title}
    </Text>
    {subtitle && (
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.md,
    marginHorizontal: Spacing.md,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    color: '#202124',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: '31.5%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xs,
    alignItems: 'center',
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: Radius.full,
    backgroundColor: '#EAF6EE',
    marginBottom: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#202124',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 10,
    color: Colors.gray500,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 2,
  },
});

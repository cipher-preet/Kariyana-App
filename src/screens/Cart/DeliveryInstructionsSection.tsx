import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const DeliveryInstructionsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery instructions</Text>

      <View style={styles.row}>
        <InstructionCard
          title="Record"
          subtitle="Press here and hold"
          highlight
        />
        <InstructionCard
          title="Avoid calling"
          subtitle="Press here and hold"
          highlight
        />
        <InstructionCard
          title="Don't ring the bell"
          subtitle="Press here and hold"
          highlight
        />
      </View>
    </View>
  );
};

export default DeliveryInstructionsSection;

/* ---------- CARD ---------- */

interface InstructionCardProps {
  title: string;
  subtitle?: string;
  highlight?: boolean;
}

const InstructionCard: React.FC<InstructionCardProps> = ({
  title,
  subtitle,
  highlight,
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    style={[
      styles.card,
      highlight && styles.highlightCard,
    ]}
  >
    <View
      style={[
        styles.iconBox,
        highlight && styles.highlightIcon,
      ]}
    />
    <Text style={styles.cardTitle}>{title}</Text>
    {subtitle && (
      <Text style={styles.subtitle}>{subtitle}</Text>
    )}
  </TouchableOpacity>
);

/* ---------- STYLES (UNCHANGED) ---------- */

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    marginTop: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    width: '31%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },

  highlightCard: {
    borderWidth: 1,
    borderColor: '#2BBE4A',
    backgroundColor: '#F3FFF7',
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },

  highlightIcon: {
    backgroundColor: '#2BBE4A',
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 11,
    color: '#777',
    textAlign: 'center',
    marginTop: 4,
  },
});

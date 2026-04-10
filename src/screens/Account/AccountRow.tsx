import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';

interface Props {
  title: string;
  onPress?: () => void;
  rightText?: string;
  badge?: string;
  highlight?: boolean;
  noBorder?: boolean;
  noArrow?: boolean;
  disabled?: boolean;
}

const AccountRow: React.FC<Props> = ({
  title,
  onPress,
  rightText,
  badge,
  highlight,
  noBorder,
  noArrow,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={onPress}
      style={[styles.row, noBorder && styles.noBorder]}
    >
      <Text
        style={[
          styles.title,
          highlight && styles.highlight,
          disabled && styles.disabled,
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      {!disabled && (
        <View style={styles.right}>
          {rightText && <Text style={styles.value}>{rightText}</Text>}

          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}

          {!noArrow && <Text style={styles.arrow}>›</Text>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AccountRow;

const styles = StyleSheet.create({
  row: {
    width: '100%',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.gray200,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  title: {
    fontSize: 15,
    color: Colors.gray900,
  },

  highlight: {
    color: Colors.success,
    fontWeight: '700',
  },

  disabled: {
    color: Colors.gray400,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  value: {
    marginRight: Spacing.xs,
    fontWeight: '600',
    color: Colors.gray900,
  },

  badge: {
    backgroundColor: Colors.error,
    borderRadius: Radius.xl,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    marginRight: Spacing.xs,
  },

  badgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '600',
  },

  arrow: {
    fontSize: 20,
    color: Colors.gray400,
  },
});

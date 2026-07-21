import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';
import { ChevronIcon } from './AccountIcons';

interface Props {
  title: string;
  icon?: React.ReactNode;
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
  icon,
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
      activeOpacity={disabled ? 1 : 0.78}
      onPress={onPress}
      disabled={disabled}
      style={[styles.row, noBorder && styles.noBorder]}
    >
      <View style={styles.left}>
        {icon && <View style={styles.icon}>{icon}</View>}
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
      </View>

      {!disabled && (
        <View style={styles.right}>
          {rightText && <Text style={styles.value}>{rightText}</Text>}

          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}

          {!noArrow && <ChevronIcon />}
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
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F0F1F3',
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: Spacing.md,
  },

  icon: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: '#F2F7F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },

  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#202124',
  },

  highlight: {
    color: '#0B6B3A',
    fontWeight: '600',
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
    fontSize: 12,
    fontWeight: '700',
    color: Colors.gray700,
  },

  badge: {
    backgroundColor: Colors.error,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    marginRight: Spacing.xs,
  },

  badgeText: {
    color: Colors.white,
    fontSize: 10.5,
    fontWeight: '700',
  },
});

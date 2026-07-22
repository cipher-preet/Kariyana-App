import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Colors, Radius, Shadows, Spacing } from '../../styles';

export type AppAlertVariant = 'success' | 'error' | 'warning' | 'info';

export type AppAlertState = {
  visible: boolean;
  title: string;
  message?: string;
  variant?: AppAlertVariant;
  primaryText?: string;
  secondaryText?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

type Props = AppAlertState & {
  onClose: () => void;
};

const VARIANT_STYLES = {
  success: {
    color: '#0B6B3A',
    backgroundColor: '#E8F5EC',
  },
  error: {
    color: Colors.error,
    backgroundColor: '#FFF1F0',
  },
  warning: {
    color: '#B77900',
    backgroundColor: '#FFF7D8',
  },
  info: {
    color: '#2563EB',
    backgroundColor: '#EEF4FF',
  },
};

const AlertIcon = ({ variant }: { variant: AppAlertVariant }) => {
  const config = VARIANT_STYLES[variant];

  return (
    <View style={[styles.iconWrap, { backgroundColor: config.backgroundColor }]}>
      <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={9} stroke={config.color} strokeWidth={2} />
        {variant === 'success' ? (
          <Path
            d="m8 12.2 2.5 2.5L16.5 9"
            stroke={config.color}
            strokeWidth={2.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : variant === 'error' ? (
          <Path
            d="m9 9 6 6M15 9l-6 6"
            stroke={config.color}
            strokeWidth={2.3}
            strokeLinecap="round"
          />
        ) : variant === 'warning' ? (
          <Path
            d="M12 7.5v5.2M12 16.4h.01"
            stroke={config.color}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        ) : (
          <Path
            d="M12 10.5v5.5M12 7.8h.01"
            stroke={config.color}
            strokeWidth={2.4}
            strokeLinecap="round"
          />
        )}
      </Svg>
    </View>
  );
};

const AppAlert = ({
  visible,
  title,
  message,
  variant = 'info',
  primaryText = 'OK',
  secondaryText,
  onPrimary,
  onSecondary,
  onClose,
}: Props) => {
  const handlePrimary = () => {
    onClose();
    onPrimary?.();
  };

  const handleSecondary = () => {
    onClose();
    onSecondary?.();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <AlertIcon variant={variant} />

          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            {secondaryText ? (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                activeOpacity={0.84}
                onPress={handleSecondary}
              >
                <Text style={styles.secondaryText}>{secondaryText}</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              activeOpacity={0.84}
              onPress={handlePrimary}
            >
              <Text style={styles.primaryText}>{primaryText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const createHiddenAlert = (): AppAlertState => ({
  visible: false,
  title: '',
});

export default AppAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(12,12,13,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },

  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
    ...Shadows.card,
  },

  iconWrap: {
    width: 62,
    height: 62,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  title: {
    fontSize: 18,
    lineHeight: 23,
    fontWeight: '800',
    color: Colors.gray900,
    textAlign: 'center',
  },

  message: {
    marginTop: Spacing.xs,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
    color: Colors.gray600,
    textAlign: 'center',
  },

  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    width: '100%',
    marginTop: Spacing.lg,
  },

  button: {
    flex: 1,
    height: 46,
    borderRadius: Radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButton: {
    backgroundColor: '#0B6B3A',
  },

  secondaryButton: {
    backgroundColor: Colors.gray100,
  },

  primaryText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
  },

  secondaryText: {
    color: Colors.gray800,
    fontSize: 13,
    fontWeight: '800',
  },
});

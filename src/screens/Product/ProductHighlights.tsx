import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import { Colors, Radius, Spacing } from '../../styles';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const ProductHighlights: React.FC<{ highlights: any[] }> = ({ highlights }) => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(!open);
  };

  return (
    <View style={styles.section}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggle}
        style={styles.header}
      >
        <View>
          <Text style={styles.eyebrow}>Product info</Text>
          <Text style={styles.title}>Highlights</Text>
        </View>

        <View style={[styles.chevron, open && styles.chevronOpen]} />
      </TouchableOpacity>

      {open && (
        <View style={styles.content}>
          {highlights.length > 0 ? (
            highlights.map((item, index) => (
              <View
                key={`${item.heading}-${index}`}
                style={[
                  styles.row,
                  index !== highlights.length - 1 && styles.divider,
                ]}
              >
                <Text style={styles.label}>{item.heading}</Text>
                <Text style={styles.value}>{item.description}</Text>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No extra highlights available</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default ProductHighlights;

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  eyebrow: {
    fontSize: 10.5,
    color: '#0B6B3A',
    fontWeight: '600',
    marginBottom: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.gray900,
  },

  chevron: {
    width: 9,
    height: 9,
    borderRightWidth: 1.7,
    borderBottomWidth: 1.7,
    borderColor: Colors.gray500,
    transform: [{ rotate: '45deg' }],
    marginRight: Spacing.xs,
  },

  chevronOpen: {
    transform: [{ rotate: '-135deg' }],
  },

  content: {
    marginTop: Spacing.md,
    backgroundColor: Colors.gray50,
    borderRadius: Radius.md,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
  },

  label: {
    flex: 0.42,
    fontSize: 12,
    color: Colors.gray600,
    fontWeight: '500',
  },

  value: {
    flex: 0.58,
    fontSize: 12,
    color: Colors.gray900,
    fontWeight: '600',
    textAlign: 'right',
  },

  emptyState: {
    padding: Spacing.md,
  },

  emptyText: {
    color: Colors.gray600,
    fontSize: 12,
    fontWeight: '500',
  },
});

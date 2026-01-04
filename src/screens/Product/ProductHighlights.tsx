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

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const DATA = [
  { label: 'Brand Warranty', value: '1 Year' },
  { label: 'Capacity', value: '80 ltrs' },
  { label: 'Closure', value: 'Zipper' },
  { label: 'Material', value: 'Polyester' },
  { label: 'Gender', value: 'Unisex' },
  { label: 'Dimensions', value: '81 x 38 x 22 cm' },
];

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
        <Text style={styles.title}>Highlights</Text>

        <View style={[styles.chevron, open && styles.chevronOpen]} />
      </TouchableOpacity>

      {open && (
        <View style={styles.content}>
          {highlights.map((item, index) => (
            <View
              key={index}
              style={[
                styles.row,
                index !== highlights.length - 1 && styles.divider,
              ]}
            >
              <Text style={styles.label}>{item.heading}</Text>
              <Text style={styles.value}>{item.description}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ProductHighlights;

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f1f1f',
  },

  chevron: {
    width: 7,
    height: 7,
    borderRightWidth: 1.2,
    borderBottomWidth: 1.2,
    borderColor: '#9e9e9e',
    transform: [{ rotate: '45deg' }],
  },

  chevronOpen: {
    transform: [{ rotate: '-135deg' }],
  },

  content: {
    backgroundColor: '#ffffff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
  },

  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e6e6e6',
  },

  label: {
    fontSize: 13,
    color: '#757575',
  },

  value: {
    fontSize: 13,
    color: '#212121',
    fontWeight: '500',
  },
});

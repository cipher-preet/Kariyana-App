import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';
import { ChevronRightIcon } from './HomeIcons';

type Props = {
  title?: string;
  onPress?: () => void;
};

const SeeAllSection: React.FC<Props> = ({
  title = 'See all products',
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.inner}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png',
          }}
          style={styles.icon}
        />

        <Text style={styles.text}>{title}</Text>
        <View style={styles.arrow}>
          <ChevronRightIcon size={16} color="#0F8A43" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SeeAllSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
    marginTop: Spacing.xs,
  },

  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.76)',
    borderRadius: Radius.full,
    minHeight: 42,
    paddingHorizontal: Spacing.md,
  },

  icon: {
    width: 18,
    height: 18,
    borderRadius: Radius.sm,
    marginRight: Spacing.md,
  },

  text: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: Colors.gray800,
  },

  arrow: {
    marginLeft: Spacing.md,
    width: 24,
    height: 24,
    borderRadius: Radius.full,
    backgroundColor: '#ECF6EF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

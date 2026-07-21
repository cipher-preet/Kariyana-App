import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Colors, Spacing, Radius } from '../../styles';

import type { Category } from '../../types';

type Props = {
  categories: Category[];
  selectedId?: string;
  onSelect?: (item: Category) => void;
};

const CategoryTabBar: React.FC<Props> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const flatRef = useRef<FlatList>(null);

  const handleSelect = (item: Category, index: number) => {
    onSelect?.(item);

    flatRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.35,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        keyExtractor={it => it.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const selected = item.id === selectedId;

          return (
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => handleSelect(item, index)}
              style={styles.tab}
            >
              <Text
                numberOfLines={1}
                style={[styles.title, selected && styles.titleSelected]}
              >
                {item.title}
              </Text>
              <View style={[styles.indicator, selected && styles.activeLine]} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoryTabBar;

const styles = StyleSheet.create({
  container: {
    height: 34,
    justifyContent: 'flex-end',
  },

  listContent: {
    alignItems: 'flex-end',
    paddingHorizontal: 0,
  },

  tab: {
    height: 30,
    minWidth: 52,
    paddingHorizontal: Spacing.sm,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    maxWidth: 78,
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    fontWeight: '700',
  },

  titleSelected: {
    color: Colors.white,
    fontWeight: '700',
  },

  indicator: {
    width: '100%',
    height: 3,
    borderRadius: Radius.full,
    backgroundColor: 'transparent',
  },

  activeLine: {
    backgroundColor: '#F7CB14',
  },
});

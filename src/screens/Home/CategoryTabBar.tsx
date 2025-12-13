import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';

import {
  Colors,
  Spacing,
  Radius,
  Typography,
} from '../../styles';

import type { Category } from '../../types';

type Props = {
  categories: Category[];
  selectedId?: string;
  onSelect?: (id: string) => void;
};

const CategoryTabBar: React.FC<Props> = ({
  categories,
  selectedId,
  onSelect,
}) => {
  const flatRef = useRef<FlatList>(null);

  const handleSelect = (id: string, index: number) => {
    onSelect?.(id);

    flatRef.current?.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.4,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatRef}
        horizontal
        data={categories}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(it) => it.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const selected = item.id === selectedId;

          return (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => handleSelect(item.id, index)}
              style={styles.itemWrapper}
            >
              {/* ICON BOX */}
              <Animated.View
                style={[
                  styles.iconBox,
                  selected && styles.iconBoxSelected,
                ]}
              >
                {item.icon ? (
                  <View
                    style={[
                      styles.svgWrapper,
                      selected && styles.svgWrapperSelected,
                    ]}
                  >
                    {item.icon}
                  </View>
                ) : (
                  <Text
                    style={[
                      styles.icon,
                      selected && styles.iconSelected,
                    ]}
                  >
                    🏷️
                  </Text>
                )}
              </Animated.View>

              {/* TITLE */}
              <Text
                numberOfLines={1}
                style={[
                  styles.title,
                  selected && styles.titleSelected,
                ]}
              >
                {item.title}
              </Text>

              {selected && <View style={styles.underline} />}
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
    backgroundColor: 'transparent',
    paddingTop: Spacing.sm,          
    paddingBottom: 0,
  },

  listContent: {
    paddingHorizontal: Spacing.xs,  
  },

  itemWrapper: {
    alignItems: 'center',
    marginRight: Spacing.xxxl,      
  },

  iconBox: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,        
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xxs,      
  },

  iconBoxSelected: {
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderColor: Colors.white,
    borderWidth: 1,
  },

  svgWrapper: {
    width: 18,
    height: 18,
  },

  svgWrapperSelected: {},

  icon: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },

  iconSelected: {
    color: Colors.white,
    opacity: 1,
  },

  title: {
    fontSize: 12,
    color: Colors.white,
    opacity: 0.85,
    marginTop: 1,
  },

  titleSelected: {
    color: Colors.white,
    opacity: 1,
    fontWeight: '600',
  },

  underline: {
    marginTop: Spacing.xxs,        
    width: 20,
    height: 2,
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
});

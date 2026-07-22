import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Radius } from '../../styles';

import SearchIcon from '../../assest/search';
import MicIcon from '../../assest/mic';

type Props = {
  placeholder?: string;
  onSearch?: (q: string) => void;
};

const SearchBar: React.FC<Props> = ({
  placeholder = 'Search for "atta & more"',
  onSearch,
}) => {
  const navigation = useNavigation<any>();


  const [q, setQ] = React.useState('');

  const openSearch = () => {
    const parent = navigation.getParent?.();

    if (parent) {
      parent.navigate('Home', { screen: 'SearchScreen' });
      return;
    }

    navigation.navigate('SearchScreen');
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={openSearch}
      >
        <View style={styles.searchContainer}>
          <SearchIcon width={18} height={18} color={Colors.gray700} />

          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.gray600}
            value={q}
            onChangeText={setQ}
            editable={false}
            pointerEvents="none"
          />

          <TouchableOpacity onPress={() => onSearch?.(q)}>
            <MicIcon width={18} height={18} color={Colors.gray600} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    marginTop: 0,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    height: 46,
    shadowColor: '#063B24',
    shadowOpacity: 0.08,
    shadowRadius: 9,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.gray900,
    fontSize: 14,
    fontWeight: '500',
  },
});

import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

import { Colors, Spacing, Radius, Shadows } from '../../styles';

import SearchIcon from '../../assest/search';
import MicIcon from '../../assest/mic';

type Props = {
  placeholder?: string;
  onSearch?: (q: string) => void;
};

const SearchBar: React.FC<Props> = ({
  placeholder = 'Search products...',
  onSearch,
}) => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  console.log(navigation.getState());

  const [q, setQ] = React.useState('');

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'HomeMain' }, { name: 'SearchScreen' }],
            }),
          );
        }}
      >
        <View style={styles.searchContainer}>
          <SearchIcon width={20} height={20} color={Colors.gray500} />

          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={Colors.gray500}
            value={q}
            onChangeText={setQ}
            editable={false}
            pointerEvents="none"
          />

          <TouchableOpacity onPress={() => onSearch?.(q)}>
            <MicIcon width={20} height={20} color={Colors.gray500} />
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
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.gray200,

    paddingHorizontal: Spacing.lg,
    height: 48,
    ...Shadows.soft,
  },

  input: {
    flex: 1,
    marginLeft: Spacing.md,
    color: Colors.gray900,
    fontSize: 15,
  },
});

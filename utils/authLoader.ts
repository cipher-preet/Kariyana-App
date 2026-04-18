import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../src/ReduxToolKit/Slices/authslice';

export const loadUserFromStorage = () => async (dispatch: any) => {
  try {
    const userId = await AsyncStorage.getItem('userId');

    if (userId) {
      dispatch(setUser(userId));
    }
  } catch (error) {
    console.log('Error loading user:', error);
  }
};

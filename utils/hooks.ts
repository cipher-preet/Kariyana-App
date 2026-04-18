import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../src/ReduxToolKit/Rtk/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: any = useSelector;
import {configureStore} from '@reduxjs/toolkit';
import ExerciseReducer from './Reducers/ExerciseReducer';
import SetReducer from './Reducers/SetReducer';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import SplitReducer from './Reducers/SplitReducer';

export const store = configureStore({
  reducer: {
    exercises: ExerciseReducer,
    sets: SetReducer,
    splits: SplitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

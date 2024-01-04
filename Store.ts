import {configureStore} from '@reduxjs/toolkit';
import ExerciseReducer from './Reducers/ExerciseReducer';
import SetReducer from './Reducers/SetReducer';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

export const store = configureStore({
  reducer: {
    exercises: ExerciseReducer,
    sets: SetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {createAction, createReducer} from '@reduxjs/toolkit';
import {IExercise} from '../types';

export const addExercise = createAction<{
  id: string;
  name: string;
  sets: number;
}>('addExercise');
export const deleteSelectedExercise = createAction<string[]>(
  'deleteSelectedExercise',
);
export const selectExercise = createAction<string>('selectExercise');
export const selectAllExercise = createAction<boolean>('selectAllExercise');
export const editExerciseName = createAction<{id: string; value: string}>(
  'editExerciseName',
);

const initialState: IExercise[] = [];

const ExerciseReducer = createReducer(initialState, builder => {
  builder
    .addCase(addExercise, (state, action) => {
      state.push({
        ...action.payload,
        selected: false,
      });
    })
    .addCase(deleteSelectedExercise, state => {
      return state.filter(exercise => !exercise.selected);
    })
    .addCase(selectExercise, (state, action) => {
      return state.map(exercise =>
        exercise.id === action.payload
          ? {...exercise, selected: !exercise.selected}
          : exercise,
      );
    })
    .addCase(selectAllExercise, (state, action) => {
      return state.map(exercise => ({...exercise, selected: action.payload}));
    })
    .addCase(editExerciseName, (state, action) => {
      return state.map(exercise =>
        exercise.id === action.payload.id
          ? {...exercise, name: action.payload.value}
          : exercise,
      );
    });
});

export default ExerciseReducer;

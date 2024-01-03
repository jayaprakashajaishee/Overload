import {createAction, createReducer} from '@reduxjs/toolkit';
import {IExercise} from '../types';

export const addExercise = createAction<{
  id: string;
  name: string;
  sets: number;
}>('addExercise');
const deleteExercise = createAction<string>('deleteExercise');

const initialState: IExercise[] = [];

const ExerciseReducer = createReducer(initialState, builder => {
  builder
    .addCase(addExercise, (state, action) => {
      const sets = new Array(action.payload.sets)
        .fill({
          targetRep: 0,
          targetWeight: 0,
        })
        .map((set, i) => ({...set, setNo: i + 1}));
      state.push({
        ...action.payload,
        sets,
      });
    })
    .addCase(deleteExercise, (state, action) => {
      return state.filter(exercise => exercise.id !== action.payload);
    });
});

export default ExerciseReducer;

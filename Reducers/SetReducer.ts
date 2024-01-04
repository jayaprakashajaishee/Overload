import {createReducer, createAction} from '@reduxjs/toolkit';
import {ISet} from '../types';
import {addExercise, deleteSelectedExercise} from './ExerciseReducer';
import uuid from 'react-native-uuid';

export const addSet = createAction<string>('addSet');
export const editSet = createAction<{
  id: string;
  value: {targetRep: number; targetWeight: number};
}>('editSet');
export const deleteSet = createAction<string>('deleteSet');

const initialState: ISet[] = [];

const SetReducer = createReducer(initialState, builder => {
  builder
    .addCase(addExercise, (state, action) => {
      const sets = new Array(action.payload.sets)
        .fill({
          excerciseId: action.payload.id,
          targetRep: 0,
          targetWeight: 0,
        })
        .map(set => ({...set, id: uuid.v4().toString()}));

      return [...state, ...sets];
    })
    .addCase(editSet, (state, action) => {
      return state.map(set =>
        set.id === action.payload.id ? {...set, ...action.payload.value} : set,
      );
    })
    .addCase(deleteSelectedExercise, (state, action) => {
      return state.filter(set => !action.payload.includes(set.excerciseId));
    })
    .addCase(addSet, (state, action) => {
      return [
        ...state,
        {
          id: uuid.v4().toString(),
          targetRep: 0,
          targetWeight: 0,
          excerciseId: action.payload,
        },
      ];
    })
    .addCase(deleteSet, (state, action) => {
      return state.filter(set => set.id !== action.payload);
    });
});

export default SetReducer;

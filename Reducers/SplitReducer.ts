import {createAction, createReducer} from '@reduxjs/toolkit';
import {ISplit} from '../types';
import uuid from 'react-native-uuid';

const initalState: ISplit[] = [];

export const addSplit = createAction<{exerciseIds: string[]; name: string}>(
  'addSplit',
);
export const selectAllSplits = createAction<boolean>('selectAllSplits');
export const selectSplit = createAction<string>('selectSplit');
export const deleteSelectedSplits = createAction('deleteSelectedSplit');
export const deleteSplit = createAction<string>('deleteSplit');
export const updateSplit = createAction<{
  id: string;
  name: string;
  exerciseIds: string[];
}>('updateSplit');

const SplitReducer = createReducer(initalState, builder => {
  builder
    .addCase(addSplit, (state, action) => {
      state.push({
        id: JSON.stringify(uuid.v4()),
        excerciseIds: action.payload.exerciseIds,
        name: action.payload.name,
        selected: false,
      });
    })
    .addCase(selectAllSplits, (state, action) => {
      return state.map(split => ({...split, selected: action.payload}));
    })
    .addCase(selectSplit, (state, action) => {
      return state.map(split =>
        split.id === action.payload
          ? {...split, selected: !split.selected}
          : split,
      );
    })
    .addCase(deleteSelectedSplits, state => {
      return state.filter(split => !split.selected);
    })
    .addCase(updateSplit, (state, action) => {
      return state.map(split =>
        split.id === action.payload.id
          ? {
              ...split,
              name: action.payload.name,
              excerciseIds: action.payload.exerciseIds,
            }
          : split,
      );
    })
    .addCase(deleteSplit, (state, action) => {
      return state.filter(split => split.id !== action.payload);
    });
});

export default SplitReducer;

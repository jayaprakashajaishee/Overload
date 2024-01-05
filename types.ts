import {NavigatorScreenParams} from '@react-navigation/native';

export interface IExercise {
  id: string;
  name: string;
  selected: boolean;
}

export interface ISet {
  id: string;
  excerciseId: string;
  targetRep?: number;
  targetWeight?: number;
}

export interface ISplit {
  id: string;
  name: string;
  excerciseIds: string[];
  selected: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Exercises: NavigatorScreenParams<ExercisesStackParamList>;
  Splits: NavigatorScreenParams<SplitsStackParamList>;
  Settings: undefined;
};

export type ExercisesStackParamList = {
  ExercisesList: undefined;
  ExerciseForm: undefined;
  Exercise: {id?: string};
};

export type SplitsStackParamList = {
  SplitsList: undefined;
  SplitForm: undefined;
  Split: {id?: string};
};

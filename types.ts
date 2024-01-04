import {NavigatorScreenParams} from '@react-navigation/native';

export interface IExercise {
  id: string;
  name: string;
  sets: ISet[];
  selected: boolean;
}

export interface ISet {
  id: string;
  targetRep?: number;
  targetWeight?: number;
}

export type RootStackParamList = {
  Home: undefined;
  Exercises: NavigatorScreenParams<ExercisesStackParamList>;
  Settings: undefined;
};

export type ExercisesStackParamList = {
  ExercisesList: undefined;
  ExerciseForm: undefined;
  Exercise: {id?: string};
};

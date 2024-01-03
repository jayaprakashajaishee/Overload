export interface IExercise {
  id: string;
  name: string;
  sets: ISet[];
}

export interface ISet {
  setNo: number;
  targetRep?: number;
  targetWeight?: number;
}

export type RootStackParamList = {
  Home: undefined;
  Exercises: undefined;
  ExerciseForm: undefined;
  Exercise: {id: string};
  Settings: undefined;
};

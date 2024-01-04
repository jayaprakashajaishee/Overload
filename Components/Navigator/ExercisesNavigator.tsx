import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import ExerciseFrom from '../Screens/Exercises/ExerciseForm';
import Exercise from '../Screens/Exercises/Exercise';
import Exercises from '../Screens/Exercises/Exercises';
import {ExercisesStackParamList, RootStackParamList} from '../../types';

const Stack = createNativeStackNavigator<ExercisesStackParamList>();

const ExerciseNavigator: React.FC<ExercisesProps> = () => {
  return (
    <Stack.Navigator initialRouteName="ExercisesList">
      <Stack.Screen
        name="ExercisesList"
        component={Exercises}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExerciseForm"
        component={ExerciseFrom}
        options={{title: 'New Exercise'}}
      />
      <Stack.Screen name="Exercise" component={Exercise} />
    </Stack.Navigator>
  );
};

export default ExerciseNavigator;

type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

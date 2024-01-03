import React from 'react';
import {Button} from 'native-base';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import ExerciseFrom from './ExerciseForm';
import Exercise from './Exercise';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ExercisePage: React.FC<ExercisesProps> = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="Exercises">
      <Stack.Screen
        name="Exercises"
        component={() => (
          <Button
            shadow={2}
            onPress={() => {
              navigation.navigate('ExerciseForm');
            }}>
            Click me
          </Button>
        )}
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

export default ExercisePage;

type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

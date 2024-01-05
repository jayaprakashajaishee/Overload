import React from 'react';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {RootStackParamList, SplitsStackParamList} from '../../types';
import Splits from '../Screens/Splits/Splits';
import SplitForm from '../Screens/Splits/SplitForm';

const Stack = createNativeStackNavigator<SplitsStackParamList>();

const SplitNavigator: React.FC<ExercisesProps> = () => {
  return (
    <Stack.Navigator initialRouteName="SplitsList">
      <Stack.Screen
        name="SplitsList"
        component={Splits}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplitForm"
        component={SplitForm}
        options={{title: 'New Split'}}
      />
    </Stack.Navigator>
  );
};

export default SplitNavigator;

type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Splits'>;

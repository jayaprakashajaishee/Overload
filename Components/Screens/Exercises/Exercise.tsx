import React, {useCallback} from 'react';
import {
  Box,
  Stack,
  FormControl,
  Input,
  WarningOutlineIcon,
  Button,
} from 'native-base';
import {useAppSelector, useAppDispatch} from '../../../Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ExercisesStackParamList} from '../../../types';
import {useFocusEffect} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {editExerciseName} from '../../../Reducers/ExerciseReducer';
import {Keyboard} from 'react-native';

const Exercise: React.FC<ExerciseProps> = ({navigation, route}) => {
  const dispatch = useAppDispatch();
  const {id} = route.params;
  const onFocus = useCallback(() => {
    const parent = navigation.getParent();
    parent?.setOptions({headerShown: false});
  }, [navigation]);

  const exercise = useAppSelector(state => state.exercises).find(
    _exercise => _exercise.id === id,
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: exercise?.name,
    },
  });
  const onSubmit = handleSubmit(data => {
    exercise && dispatch(editExerciseName({id: exercise.id, value: data.name}));

    Keyboard.dismiss();
  });

  useFocusEffect(onFocus);

  return (
    <Box w="100%" maxWidth="100%" flex={1} justifyContent="space-between">
      <Stack mx={10} my={4} space={4}>
        <Controller
          name="name"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, onBlur, value}}) => (
            <FormControl isInvalid={!!errors.name}>
              <Input
                placeholder="name of exercise"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                size={'xl'}
              />
              {errors.name && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Enter a name
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
        />
      </Stack>
      {watch('name') !== exercise?.name && (
        <Button onPress={onSubmit} mx={10} mb={4}>
          Save
        </Button>
      )}
    </Box>
  );
};

type ExerciseProps = NativeStackScreenProps<
  ExercisesStackParamList,
  'Exercise'
>;

type FormData = {
  name: string;
};

export default Exercise;

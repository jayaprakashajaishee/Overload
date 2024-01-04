import React, {useCallback} from 'react';
import {
  Box,
  FormControl,
  Stack,
  Input,
  WarningOutlineIcon,
  Button,
  Slider,
} from 'native-base';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ExercisesStackParamList} from '../../../types';
import {useForm, Controller} from 'react-hook-form';
import {useAppDispatch} from '../../../Store';
import {addExercise} from '../../../Reducers/ExerciseReducer';
import uuid from 'react-native-uuid';
import {useFocusEffect} from '@react-navigation/native';

const ExerciseFrom: React.FC<ExercisesFormProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const onFocus = useCallback(() => {
    const parent = navigation.getParent();
    parent?.setOptions({headerShown: false});
  }, [navigation]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      sets: 1,
    },
  });

  const onSubmit = handleSubmit(data => {
    const id = uuid.v4().toString();
    dispatch(addExercise({id, ...data}));
    reset();
    navigation.navigate('ExercisesList');
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
        <Controller
          name="sets"
          control={control}
          rules={{required: true}}
          render={({field: {onChange, value}}) => (
            <FormControl>
              <FormControl.Label>No of Sets {value}</FormControl.Label>
              <Slider
                size={'lg'}
                defaultValue={1}
                value={value}
                onChange={onChange}
                maxValue={15}
                minValue={1}>
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb />
              </Slider>
            </FormControl>
          )}
        />
      </Stack>
      <Button onPress={onSubmit} mx={10} mb={4}>
        Save
      </Button>
    </Box>
  );
};

export default ExerciseFrom;

type ExercisesFormProps = NativeStackScreenProps<
  ExercisesStackParamList,
  'ExerciseForm'
>;

type FormData = {
  name: string;
  sets: number;
};

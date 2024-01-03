import React, {useCallback} from 'react';
import {
  Box,
  Stack,
  FormControl,
  Input,
  WarningOutlineIcon,
  Slider,
} from 'native-base';
import {useAppSelector} from '../../Store';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {useFocusEffect} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const Exercise: React.FC<ExerciseProps> = ({navigation, route}) => {
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
    reset,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: exercise?.name,
      sets: exercise?.sets.length,
    },
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
    </Box>
  );
};

type ExerciseProps = NativeStackScreenProps<RootStackParamList, 'Exercise'>;

type FormData = {
  name: string;
  sets: number;
};

export default Exercise;

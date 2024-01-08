import React, {useState, useCallback} from 'react';
import {
  Box,
  Stack,
  FormControl,
  Input,
  WarningOutlineIcon,
  Button,
  FlatList,
  Checkbox,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SplitsStackParamList} from '../../../types';
import {useForm, Controller} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../../Store';
import {addSplit, updateSplit} from '../../../Reducers/SplitReducer';

const SplitForm: React.FC<SplitFormProps> = ({navigation, route}) => {
  const params = route.params;
  const dispatch = useAppDispatch();
  const exercises = useAppSelector(state => state.exercises);
  const split = useAppSelector(state => state.splits).find(
    _split => _split.id === params?.id,
  );
  const [selectedExercises, setselectedExercises] = useState<string[]>(
    split?.excerciseIds || [],
  );

  const onFocus = useCallback(() => {
    if (params?.id) {
      navigation.setOptions({title: 'Edit Set'});
    }
    const parent = navigation.getParent();
    parent?.setOptions({headerShown: false});
  }, [navigation, params]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: split?.name || '',
    },
  });
  const onSubmit = handleSubmit(data => {
    if (params?.id) {
      dispatch(
        updateSplit({
          name: data.name,
          exerciseIds: selectedExercises,
          id: params.id,
        }),
      );
    } else {
      dispatch(addSplit({exerciseIds: selectedExercises, name: data.name}));
    }
    navigation.goBack();
  });
  const onCheck: (value: boolean, id: string) => void = (value, id) => {
    if (value) {
      setselectedExercises(prev => [...prev, id]);
    } else {
      setselectedExercises(prev => prev.filter(_id => _id !== id));
    }
  };

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
                placeholder="name of Split"
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
      <FlatList
        data={exercises}
        renderItem={({item}) => (
          <Checkbox
            value={item.id}
            isChecked={selectedExercises.includes(item.id)}
            mx={10}
            my={2}
            size="lg"
            onChange={v => onCheck(v, item.id)}>
            {item.name}
          </Checkbox>
        )}
      />
      <Button onPress={onSubmit} mx={10} mb={4}>
        Save
      </Button>
    </Box>
  );
};

export default SplitForm;

type SplitFormProps = NativeStackScreenProps<SplitsStackParamList, 'SplitForm'>;
type FormData = {
  name: string;
};

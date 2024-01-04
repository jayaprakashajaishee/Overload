import {
  Box,
  Text,
  FlatList,
  Fab,
  Center,
  IconButton,
  useDisclose,
  Actionsheet,
  Pressable,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../../Store';
import Icon from 'react-native-vector-icons/Entypo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IExercise, ExercisesStackParamList} from '../../../types';
import {useFocusEffect} from '@react-navigation/native';
import {
  selectExercise,
  selectAllExercise,
  deleteSelectedExercise,
} from '../../../Reducers/ExerciseReducer';

const Exercises: React.FC<ExerciseProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [selectMode, setselectMode] = useState<boolean>(false);
  const exercises = useAppSelector(state => state.exercises);

  const onPress = useCallback<(item: IExercise) => void>(
    item => {
      if (selectMode) {
        dispatch(selectExercise(item.id));
      } else {
        navigation.navigate('Exercise', {id: item.id});
      }
    },
    [navigation, selectMode, dispatch],
  );
  const onLongPress = useCallback<(item: IExercise) => void>(
    item => {
      setselectMode(true);
      dispatch(selectExercise(item.id));
    },
    [dispatch],
  );

  const actionSheetButton = useCallback(
    () => (
      <IconButton
        onPress={onOpen}
        m={2}
        icon={<Icon name="dots-three-vertical" color="black" size={20} />}
      />
    ),
    [onOpen],
  );
  const onFocus = useCallback(() => {
    navigation.getParent()?.setOptions({
      headerShown: true,
      headerRight: actionSheetButton,
    });
  }, [navigation, actionSheetButton]);
  const onSelectAll = () => {
    setselectMode(true);
    dispatch(selectAllExercise(true));
  };
  const onDone = () => {
    setselectMode(false);
    dispatch(selectAllExercise(false));
  };
  const onDelete = () => {
    setselectMode(false);
    dispatch(
      deleteSelectedExercise(
        exercises.filter(exercise => exercise.selected).map(item => item.id),
      ),
    );
  };

  useFocusEffect(onFocus);
  useEffect(() => {
    if (!exercises.some(exercise => exercise.selected === true)) {
      navigation.getParent()?.setOptions({
        title: 'Exercises',
      });
      setselectMode(false);
    } else {
      navigation.getParent()?.setOptions({
        title: `${exercises.filter(ex => ex.selected).length} Selected`,
      });
    }
  }, [exercises, navigation]);

  return (
    <Box w="100%" maxWidth="100%" flex={1} bgColor="light.100">
      <FlatList
        my={4}
        data={exercises}
        renderItem={({item}) => (
          <Pressable
            onLongPress={() => onLongPress(item)}
            onPress={() => onPress(item)}>
            {({isPressed}) => {
              return (
                <Center
                  shadow={2}
                  bgColor={
                    item.selected
                      ? 'light.200'
                      : isPressed
                      ? 'light.100'
                      : 'light.50'
                  }
                  mx={5}
                  my={2}
                  h="20"
                  rounded="lg">
                  <Text fontSize={'2xl'}>{item.name}</Text>
                </Center>
              );
            }}
          </Pressable>
        )}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon name="plus" size={30} />}
        onPress={() => navigation.navigate('ExerciseForm')}
      />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={onSelectAll}>Select All</Actionsheet.Item>
          <Actionsheet.Item onPress={onDone}>Done</Actionsheet.Item>
          <Actionsheet.Item onPress={onDelete}>Delete</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

type ExerciseProps = NativeStackScreenProps<
  ExercisesStackParamList,
  'ExercisesList'
>;

export default Exercises;

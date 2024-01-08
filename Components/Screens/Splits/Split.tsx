import {
  useDisclose,
  Actionsheet,
  Box,
  FlatList,
  Pressable,
  Button,
  Text,
} from 'native-base';
import React, {useCallback, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SplitsStackParamList} from '../../../types';
import {useAppSelector} from '../../../Store';
import ActionButton from '../../ActionButton';
import {useFocusEffect} from '@react-navigation/native';
import ItemCard from '../../ItemCard';
import SplitExerciseInfo from './SplitExerciseInfo';

const Split: React.FC<SplitProps> = ({navigation, route}) => {
  const [start, setStart] = useState<boolean>();
  const {id} = route.params;
  const {isOpen, onOpen, onClose} = useDisclose();
  const split = useAppSelector(state => state.splits).find(
    _split => _split.id === id,
  );
  const [selectedExercise, setSelectedExercise] = useState<string | undefined>(
    split?.excerciseIds[0],
  );
  const exercises = useAppSelector(state => state.exercises).filter(exe =>
    split?.excerciseIds.includes(exe.id),
  );
  const actionSheetButton = useCallback(
    () => <ActionButton onOpen={onOpen} />,
    [onOpen],
  );
  const onFocus = () => {
    navigation.setOptions({
      title: split?.name || 'Split',
      headerRight: actionSheetButton,
    });
    navigation.getParent()?.setOptions({
      headerShown: false,
    });
  };

  useFocusEffect(onFocus);

  return (
    <>
      {split && (
        <>
          <Box
            w="100%"
            maxWidth="100%"
            flex={1}
            bgColor="light.100"
            justifyContent="space-between">
            <SplitExerciseInfo exerciseId={selectedExercise} />
            <FlatList
              data={exercises}
              renderItem={({item}) => (
                <Pressable onPress={() => setSelectedExercise(item.id)}>
                  {({isPressed}) => (
                    <ItemCard
                      name={item.name}
                      isPressed={isPressed}
                      selected={selectedExercise === item.id}
                    />
                  )}
                </Pressable>
              )}
            />
            {selectedExercise && (
              <Button mx={10} mb={4}>
                Start
              </Button>
            )}
          </Box>
          <Actionsheet isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item>Edit</Actionsheet.Item>
              <Actionsheet.Item>Delete</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </>
      )}
    </>
  );
};

export default Split;

type SplitProps = NativeStackScreenProps<SplitsStackParamList, 'Split'>;

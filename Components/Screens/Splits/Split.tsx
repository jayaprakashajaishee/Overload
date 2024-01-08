import {
  useDisclose,
  Actionsheet,
  Box,
  FlatList,
  Pressable,
  Button,
} from 'native-base';
import React, {useCallback} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SplitsStackParamList} from '../../../types';
import {useAppSelector} from '../../../Store';
import ActionButton from '../../ActionButton';
import {useFocusEffect} from '@react-navigation/native';
import ItemCard from '../../ItemCard';

const Split: React.FC<SplitProps> = ({navigation, route}) => {
  const {id} = route.params;
  const {isOpen, onOpen, onClose} = useDisclose();
  const split = useAppSelector(state => state.splits).find(
    _split => _split.id === id,
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
            <FlatList
              data={exercises}
              renderItem={({item}) => (
                <Pressable>
                  {({isPressed}) => (
                    <ItemCard
                      name={item.name}
                      isPressed={isPressed}
                      selected={item.selected}
                    />
                  )}
                </Pressable>
              )}
            />
            <Button mx={10} mb={4}>
              Start
            </Button>
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

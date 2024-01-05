import React, {useCallback, useState, useEffect} from 'react';
import {
  Box,
  Fab,
  FlatList,
  Pressable,
  Center,
  Text,
  Actionsheet,
  useDisclose,
} from 'native-base';
import {SplitsStackParamList} from '../../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Entypo';
import {useAppSelector, useAppDispatch} from '../../../Store';
import {useFocusEffect} from '@react-navigation/native';
import {ISplit} from '../../../types';
import ActionButton from '../../ActionButton';
import {
  selectSplit,
  selectAllSplits,
  deleteSelectedSplits,
} from '../../../Reducers/SplitReducer';

const Splits: React.FC<SplitsProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const splits = useAppSelector(state => state.splits);
  const [selectMode, setselectMode] = useState<boolean>(false);
  const {isOpen, onOpen, onClose} = useDisclose();
  const actionSheetButton = useCallback(
    () => <ActionButton onOpen={onOpen} />,
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
    dispatch(selectAllSplits(true));
  };
  const onDone = () => {
    setselectMode(false);
    dispatch(selectAllSplits(false));
  };
  const onDelete = () => {
    setselectMode(false);
    dispatch(deleteSelectedSplits());
  };
  const onPress = useCallback<(item: ISplit) => void>(
    item => {
      if (selectMode) {
        dispatch(selectSplit(item.id));
      } else {
        // navigation.navigate('Split', {id: item.id});
      }
    },
    [selectMode, dispatch],
  );
  const onLongPress = useCallback<(item: ISplit) => void>(
    item => {
      setselectMode(true);
      dispatch(selectSplit(item.id));
    },
    [dispatch],
  );

  useFocusEffect(onFocus);
  useEffect(() => {
    if (!splits.some(split => split.selected === true)) {
      navigation.getParent()?.setOptions({
        title: 'Workout Splits',
      });
      setselectMode(false);
    } else {
      navigation.getParent()?.setOptions({
        title: `${splits.filter(split => split.selected).length} Selected`,
      });
    }
  }, [splits, navigation]);

  return (
    <Box w="100%" maxWidth="100%" flex={1} bgColor="light.100">
      <FlatList
        my={4}
        data={splits}
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
        onPress={() => navigation.navigate('SplitForm')}
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

export default Splits;

type SplitsProps = NativeStackScreenProps<SplitsStackParamList, 'SplitsList'>;

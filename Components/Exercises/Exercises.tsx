import {
  Box,
  Text,
  FlatList,
  Fab,
  Flex,
  Center,
  Pressable,
  IconButton,
} from 'native-base';
import React, {useCallback} from 'react';
import {useAppSelector} from '../../Store';
import Icon from 'react-native-vector-icons/Entypo';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import {useFocusEffect} from '@react-navigation/native';

const Exercises: React.FC<ExerciseProps> = ({navigation}) => {
  const exercises = useAppSelector(state => state.exercises);
  const actionSheetButton = () => (
    <IconButton
      m={2}
      icon={<Icon name="dots-three-vertical" color="black" size={20} />}
    />
  );
  const onFocus = useCallback(() => {
    navigation.getParent()?.setOptions({
      headerShown: true,
      headerRight: actionSheetButton,
    });
  }, [navigation]);

  useFocusEffect(onFocus);

  return (
    <Box w="100%" maxWidth="100%" flex={1} bgColor="light.100">
      <FlatList
        my={4}
        data={exercises}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('Exercise', {id: item.id})}>
            {({isPressed}) => {
              return (
                <Center
                  shadow={2}
                  bgColor={isPressed ? 'light.200' : 'light.50'}
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
    </Box>
  );
};

type ExerciseProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>;

export default Exercises;

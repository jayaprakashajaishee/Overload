import React from 'react';
import {Box, Text} from 'native-base';
import {useAppSelector} from '../../../Store';

const SplitExerciseInfo: React.FC<IProp> = ({exerciseId}) => {
  const exercise = useAppSelector(state => state.exercises).find(
    exe => exe.id === exerciseId,
  );
  const sets = useAppSelector(state => state.sets).filter(
    set => set.excerciseId === exerciseId,
  );

  return (
    <Box my={5}>
      <Text mx={10}>Selected exercise: {exercise?.name}</Text>
      <Text mx={10}>Number of sets: {sets.length}</Text>
    </Box>
  );
};

export default SplitExerciseInfo;

interface IProp {
  exerciseId: string | undefined;
}

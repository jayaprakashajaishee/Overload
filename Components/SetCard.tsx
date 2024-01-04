import React from 'react';
import {ISet} from '../types';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Slider,
  Button,
  HStack,
} from 'native-base';
import {useForm, Controller} from 'react-hook-form';
import {useAppDispatch} from '../Store';
import {editSet, deleteSet} from '../Reducers/SetReducer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SetCard: React.FC<{set: ISet; index: number}> = ({set, index}) => {
  const dispatch = useAppDispatch();
  const {control, handleSubmit, watch} = useForm<FormData>({
    defaultValues: {
      targetRep: set.targetRep,
      targetWeight: set.targetWeight,
    },
  });

  const onSubmit = handleSubmit(data =>
    dispatch(editSet({id: set.id, value: data})),
  );

  return (
    <Box shadow={2} bgColor={'light.50'} my={2} rounded="lg" mx={10}>
      <VStack space={3}>
        <HStack justifyContent="space-between" alignItems="center" m={3}>
          <Heading fontWeight="semibold">Set {index + 1}</Heading>
          <Icon
            name="delete"
            color="red"
            size={30}
            onPress={() => dispatch(deleteSet(set.id))}
          />
        </HStack>
        <Box mx={8} my={5}>
          <Controller
            name="targetRep"
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <FormControl>
                <FormControl.Label>Target Rep {value}</FormControl.Label>
                <Slider
                  size={'lg'}
                  value={value}
                  onChange={onChange}
                  maxValue={15}
                  minValue={0}>
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </FormControl>
            )}
          />
          <Controller
            name="targetWeight"
            control={control}
            rules={{required: true}}
            render={({field: {onChange, value}}) => (
              <FormControl>
                <FormControl.Label>Target Weight {value}</FormControl.Label>
                <Slider
                  size={'lg'}
                  value={value}
                  onChange={onChange}
                  maxValue={15}
                  minValue={0}>
                  <Slider.Track>
                    <Slider.FilledTrack />
                  </Slider.Track>
                  <Slider.Thumb />
                </Slider>
              </FormControl>
            )}
          />
        </Box>
        {(set.targetRep !== watch('targetRep') ||
          set.targetWeight !== watch('targetWeight')) && (
          <Button m={3} onPress={onSubmit}>
            Save
          </Button>
        )}
      </VStack>
    </Box>
  );
};

type FormData = {
  targetRep: number;
  targetWeight: number;
};

export default SetCard;

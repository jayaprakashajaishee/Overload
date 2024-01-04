import React from 'react';
import {ISet} from '../types';
import {Box, Heading, VStack, FormControl, Slider, Button} from 'native-base';
import {useForm, Controller} from 'react-hook-form';

const SetCard: React.FC<{set: ISet; index: number}> = ({set, index}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      targetRep: set.targetRep,
      targetWeight: set.targetWeight,
    },
  });

  console.log(watch('targetRep'));
  return (
    <Box shadow={2} bgColor="light.50" my={2} rounded="lg" mx={10}>
      <VStack space={3}>
        <Heading fontWeight={10} m={3}>
          Set {index + 1}
        </Heading>
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
          <Button m={3}>Save</Button>
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

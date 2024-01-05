import React from 'react';
import {Center, Text} from 'native-base';

const ItemCard: React.FC<IProps> = ({selected, isPressed, name}) => {
  return (
    <Center
      shadow={2}
      bgColor={selected ? 'light.200' : isPressed ? 'light.100' : 'light.50'}
      mx={5}
      my={2}
      h="20"
      rounded="lg">
      <Text fontSize={'2xl'}>{name}</Text>
    </Center>
  );
};

export default ItemCard;

interface IProps {
  isPressed: boolean;
  selected: boolean;
  name: string;
}

import React from 'react';
import {IconButton} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

const ActionButton: React.FC<{onOpen: () => void}> = ({onOpen}) => {
  return (
    <IconButton
      onPress={onOpen}
      m={2}
      icon={<Icon name="dots-three-vertical" color="black" size={20} />}
    />
  );
};

export default ActionButton;

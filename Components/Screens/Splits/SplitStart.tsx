import React from 'react';
import {Box, VStack} from 'native-base';

const SplitStart: React.FC = () => {
  return (
    <Box shadow={2} bgColor={'light.50'} my={2} rounded="lg" mx={10}>
      <VStack>Hello</VStack>
    </Box>
  );
};

export default SplitStart;

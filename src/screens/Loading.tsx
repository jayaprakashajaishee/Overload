import React from 'react';
import {Colors, View, LoaderScreen} from 'react-native-ui-lib';

const Loading = () => {
  return (
    <View flex center>
      <LoaderScreen color={Colors.highlight} />
    </View>
  );
};

export default Loading;

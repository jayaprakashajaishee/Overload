import {ViewStyle} from 'react-native';

export const centerContainer: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
};

export const centerFlexContainer: ViewStyle = {
  flex: 1,
  ...centerContainer,
};

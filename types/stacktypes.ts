import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: undefined;
};

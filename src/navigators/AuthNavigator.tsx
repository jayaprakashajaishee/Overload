import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from '../screens/Login';
import SignUpPage from '../screens/SignUp';
import {darkColors} from '../constants/colors';
import {AuthStackParamList} from '../../types/stacktypes';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        statusBarColor: darkColors.background,
        navigationBarColor: darkColors.background,
      }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

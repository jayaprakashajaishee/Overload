import React, {useState, useEffect} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../firebase/config';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loading from '../screens/Loading';
import {RootStackParamList} from '../../types/stacktypes';
import {darkColors} from '../constants/colors';
import AuthNavigator from './AuthNavigator';
import {View, Text} from 'react-native-ui-lib';

const Home = () => {
  return (
    <View flex center>
      <Text highlight>Logged in</Text>
    </View>
  );
};

const RootNavigator = () => {
  const [initializing, setinitializing] = useState<boolean>(true);
  const [loggedIn, setloggedIn] = useState<boolean>(false);

  const RootStack = createNativeStackNavigator<RootStackParamList>();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setinitializing(false);
        setloggedIn(true);
      } else {
        setinitializing(false);
      }
    });
  }, []);
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarColor: darkColors.background,
        navigationBarColor: darkColors.background,
      }}>
      {initializing && <RootStack.Screen name="Loading" component={Loading} />}
      {!loggedIn ? (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <RootStack.Screen name="Home" component={Home} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;

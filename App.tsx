/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {Text, Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NativeBaseProvider} from 'native-base';
import ExerciseNavigator from './Components/Navigator/ExercisesNavigator';
import {RootStackParamList} from './types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './Store';
import SplitNavigator from './Components/Navigator/SplitNavigator';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './Store';

const HomeScreen: React.FC<HomeProps> = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
      }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() =>
          navigation.navigate('Exercises', {screen: 'ExercisesList'})
        }
      />
    </View>
  );
};

const Drawer = createDrawerNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <NavigationContainer>
              <Drawer.Navigator
                initialRouteName="Home"
                screenOptions={{swipeEnabled: true, swipeEdgeWidth: 100}}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Exercises" component={ExerciseNavigator} />
                <Drawer.Screen
                  name="Splits"
                  component={SplitNavigator}
                  options={{title: 'Workout Splits'}}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

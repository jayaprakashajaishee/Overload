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
        onPress={() => navigation.navigate('Exercises')}
      />
    </View>
  );
};

const DetailsScreen: React.FC<ExercisesProps> = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
    </View>
  );
};

const Drawer = createDrawerNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Exercises" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

type RootStackParamList = {
  Home: undefined;
  Exercises: undefined;
  Settings: undefined;
};
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type ExercisesProps = NativeStackScreenProps<RootStackParamList, 'Exercises'>;
// type SettingsProps = NativeStackScreenProps<RootStackParamList, 'Settings'>;

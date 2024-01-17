/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {RootStackParamList} from './types';
import {Provider} from 'react-redux';
import {store} from './Store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './Store';
import AuthNavigator from './src/navigators/AuthNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigatorDarktheme} from './src/constants/navigatorTheme';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer theme={navigatorDarktheme}>
            <AuthNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

// type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

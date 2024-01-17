// import {Text, View} from 'native-base';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {safeAreaStyle, textInput} from '../styles';
('../styles');
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {centerFlexContainer} from '../constants/styles';
import {darkColors} from '../constants/colors';

const LoginPage = () => {
  return (
    <SafeAreaView style={safeAreaStyle.container}>
      <View style={styles.container}>
        <Text style={styles.logo}>Overload</Text>
        <TextInput style={styles.input} placeholder="User name" />
        <TextInput style={styles.input} placeholder="Password" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: centerFlexContainer,
  logo: {
    color: darkColors.highlight,
    fontSize: 50,
    fontWeight: '900',
  },
  input: {...textInput.normal, width: 300},
});

export default LoginPage;

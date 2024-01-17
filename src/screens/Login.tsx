import {Text, View, TextField, Button, Colors} from 'react-native-ui-lib';
import {safeAreaStyle} from '../styles';
import {StyleSheet} from 'react-native';
('../styles');
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../constants/colors';
import {useForm, Controller} from 'react-hook-form';

const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const onSubmit = handleSubmit(data => console.log(data));

  return (
    <SafeAreaView style={safeAreaStyle.container}>
      <View flex center>
        <Text text10 highlight style={styles.logo}>
          Overload
        </Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              white
              placeholderTextColor={Colors.accent1}
              style={styles.input}
              placeholder="User name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
        />
        {errors.username && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextField
              white
              placeholderTextColor={Colors.accent1}
              style={styles.input}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && <Text>This is required.</Text>}
        <Button
          label="Log in"
          marginT-10
          bg-highlight
          color={Colors.background}
          style={styles.button}
          onPress={onSubmit}
        />
        <Button
          label="Sign up"
          margin-10
          bg-background
          outlineColor={Colors.accent1}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 50,
    borderColor: darkColors.accent1,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5,
    margin: 4,
    padding: 4,
  },
  button: {
    width: 300,
  },
  logo: {
    fontWeight: 'bold',
  },
});

export default LoginPage;

type FormData = {
  username: string;
  password: string;
};

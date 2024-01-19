import React from 'react';
import {Text, View, Button, Colors} from 'react-native-ui-lib';
import {safeAreaStyle} from '../styles';
import {StyleSheet} from 'react-native';
('../styles');
import {SafeAreaView} from 'react-native-safe-area-context';
import {darkColors} from '../constants/colors';
import {useForm, Controller} from 'react-hook-form';
import {auth} from '../../firebase/config';
import {AuthStackParamList} from '../../types/stacktypes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import InputField from '../components/InputField';
import {loginWithEmailPassword} from '../helpers/authHelpers';

const LoginPage = ({navigation}: Props) => {
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
  const signIn = async (data: FormData) => {
    console.log(auth);
    console.log('clicked');
    const {userCred, error} = await loginWithEmailPassword(data);
    console.log({userCred, error});
  };
  const onSubmit = handleSubmit(data => signIn(data));

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
            <InputField
              white
              width={300}
              placeholderTextColor={Colors.accent1}
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
            <InputField
              textContentType="password"
              white
              placeholderTextColor={Colors.accent1}
              width={300}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              showPasswordIcon
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
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
  },
  logo: {
    fontWeight: 'bold',
  },
  checkboxLabel: {color: darkColors.accent1, fontSize: 15},
});

export default LoginPage;

type FormData = {
  username: string;
  password: string;
};

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

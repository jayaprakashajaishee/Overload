import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Button, Colors} from 'react-native-ui-lib';
import {darkColors} from '../constants/colors';
import {useForm, Controller} from 'react-hook-form';
import {signupWithEmailPassword} from '../helpers/authHelpers';
import InputField from '../components/InputField';
import Loading from './Loading';

const SignUpPage = () => {
  const [loading, setloading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onRegister = handleSubmit(async data => {
    setloading(true);
    if (data.password === data.confirmPassword) {
      const {userCred, error} = await signupWithEmailPassword(data);
      console.log({userCred, error});
    }
    setloading(false);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <View flex center>
      <Text text10 highlight>
        Sign up
      </Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <InputField
            white
            placeholderTextColor={Colors.accent1}
            width={300}
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
            white
            placeholderTextColor={Colors.accent1}
            width={300}
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}
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
            placeholder="Confirm Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            textContentType="password"
          />
        )}
        name="confirmPassword"
      />
      {errors.password && <Text>This is required.</Text>}
      <Button
        label="Register"
        marginT-10
        bg-highlight
        color={Colors.background}
        style={styles.button}
        onPress={onRegister}
      />
      {/* <Toast
        visible={true}
        position={''}
        autoDismiss={5000}
        // onDismiss={onDismiss}
      /> */}
    </View>
  );
};

export default SignUpPage;

type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
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
    padding: 10,
  },
  button: {
    width: 300,
  },
});

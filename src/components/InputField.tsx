import React, {useState} from 'react';
import {TextFieldProps, TextField, View} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Entypo';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  Pressable,
} from 'react-native';
import {darkColors} from '../constants/colors';

const InputField = ({
  width,
  onBlur,
  textContentType,
  secureTextEntry,
  ...props
}: TextFieldProps & Props) => {
  const [focus, setfocus] = useState<boolean>(false);
  const [showPassword, setshowPassword] = useState<boolean>(
    textContentType === 'password',
  );

  const _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setfocus(false);
    onBlur && onBlur(e);
  };

  const styles = StyleSheet.create({
    input: {
      width: width ? width - 60 : 100,
      alignItems: 'stretch',
      fontSize: 20,
      height: 50,
      paddingHorizontal: 10,
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width || '100%',
      borderWidth: 2,
      borderColor: focus ? darkColors.accent1 : darkColors.accent2,
      borderRadius: 5,
      margin: 4,
    },
    eyeIconContainer: {
      padding: 10,
    },
  });

  return (
    <View style={styles.container}>
      <TextField
        {...props}
        style={styles.input}
        onFocus={() => setfocus(true)}
        onBlur={_onBlur}
        secureTextEntry={showPassword || secureTextEntry}
      />
      {textContentType === 'password' && (
        <Pressable
          style={styles.eyeIconContainer}
          onPress={() => setshowPassword(prev => !prev)}>
          <Icon
            color={darkColors.highlight}
            size={22}
            name={showPassword ? 'eye' : 'eye-with-line'}
          />
        </Pressable>
      )}
    </View>
  );
};

type Props = {
  width?: number;
};

export default InputField;

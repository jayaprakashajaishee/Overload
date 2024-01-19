import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../../firebase/config';

const loginWithEmailPassword = async (data: {
  username: string;
  password: string;
}) => {
  let userCred;
  let error;
  try {
    userCred = await signInWithEmailAndPassword(
      auth,
      data.username,
      data.password,
    );
  } catch (err) {
    error = err;
  }

  return {userCred, error};
};

const signupWithEmailPassword = async (data: {
  username: string;
  password: string;
}) => {
  let userCred;
  let error;
  try {
    userCred = await createUserWithEmailAndPassword(
      auth,
      data.username,
      data.password,
    );
  } catch (err) {
    error = err;
  }

  return {userCred, error};
};

export {loginWithEmailPassword, signupWithEmailPassword};

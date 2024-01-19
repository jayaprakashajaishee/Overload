// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjYmGPoSgXyCHg5iA45C9FeCeOQ7LLn6E',
  authDomain: 'overload-d3681.firebaseapp.com',
  projectId: 'overload-d3681',
  storageBucket: 'overload-d3681.appspot.com',
  messagingSenderId: '316531243051',
  appId: '1:316531243051:web:9908bf6744cc1870c1126e',
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseapp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default firebaseapp;

export {auth};

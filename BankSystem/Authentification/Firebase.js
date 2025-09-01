import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_QOO6Sl_oLFLjzBR9_wcbcOL1POJ0Fo0",
  authDomain: "login-example-b8950.firebaseapp.com",
  projectId: "login-example-b8950",
  storageBucket: "login-example-b8950.firebasestorage.app",
  messagingSenderId: "134742518255",
  appId: "1:134742518255:web:55afda695679c40ef12e1a",
  measurementId: "G-271F2TG4JJ"
};

//const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
//const auth = getAuth(app);
const db = getDatabase(app);
const imageDb = getStorage(app);



export { app, auth, db, imageDb };

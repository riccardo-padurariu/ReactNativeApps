import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs99xQQYegU3Ej2liQYzIWTZS-VIkWeQc",
  authDomain: "user-auth-app-9fa87.firebaseapp.com",
  projectId: "user-auth-app-9fa87",
  storageBucket: "user-auth-app-9fa87.firebasestorage.app",
  messagingSenderId: "914997060677",
  appId: "1:914997060677:web:3d6c2e568349082e1d2f2c"
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

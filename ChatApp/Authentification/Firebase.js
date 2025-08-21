import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfwG-J6ksaZuwCbk4FThPwFvJ0RHK5s6U",
  authDomain: "fir-expoapp-8846d.firebaseapp.com",
  projectId: "fir-expoapp-8846d",
  storageBucket: "fir-expoapp-8846d.firebasestorage.app",
  messagingSenderId: "369285502452",
  appId: "1:369285502452:web:8920f209da1f35afb055a1"
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

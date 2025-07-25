import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD06iu2Si9MwUaXuzbalDTx2X7_jtbQc7U",
  authDomain: "finala-8867b.firebaseapp.com",
  projectId: "finala-8867b",
  storageBucket: "finala-8867b.firebasestorage.app",
  messagingSenderId: "241486335890",
  appId: "1:241486335890:web:39b3534787b2bea8dc3b4b"
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

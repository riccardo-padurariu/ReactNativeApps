import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBekOrNZAhne57ckIb_r9at48Be0kLKRDs",
  authDomain: "sampleapp-63c9b.firebaseapp.com",
  projectId: "sampleapp-63c9b",
  storageBucket: "sampleapp-63c9b.firebasestorage.app",
  messagingSenderId: "359059336506",
  appId: "1:359059336506:web:a231bb73468f20424c7403"
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

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4HqpUL2WTgS63YFa-6oNhWrCWo6oqoxw",
  authDomain: "musicplayer-5bf9b.firebaseapp.com",
  projectId: "musicplayer-5bf9b",
  storageBucket: "musicplayer-5bf9b.firebasestorage.app",
  messagingSenderId: "139421038331",
  appId: "1:139421038331:web:125999334d207bc686e25e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
//const auth = getAuth(app);
const db = getFirestore();
const imageDb = getStorage(app);



export { app, auth, db, imageDb };

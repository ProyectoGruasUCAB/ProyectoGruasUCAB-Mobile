import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDZj4a7LCt0HTYnvw8w0--CJ__SdwGxr80",
  authDomain: "gruasucab-a7d08.firebaseapp.com",
  projectId: "gruasucab-a7d08",
  storageBucket: "gruasucab-a7d08.appspot.com",
  messagingSenderId: "151879219568",
  appId: "1:151879219568:android:17eb920c209e770c31b7b5",
  measurementId: "G-XXXXXXXXXX",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { auth, db, messaging };
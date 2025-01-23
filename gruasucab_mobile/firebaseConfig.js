import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyDZj4a7LCt0HTYnvw8w0--CJ__SdwGxr80",
  authDomain: "gruasucab-a7d08.firebaseapp.com",
  projectId: "gruasucab-a7d08",
  storageBucket: "gruasucab-a7d08.appspot.com",
  messagingSenderId: "151879219568",
  appId: "1:151879219568:android:17eb920c209e770c31b7b5",
  measurementId: "G-XZPEBFQ0GB",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

console.log("Firebase starting ", app)

export { auth, db, messaging };
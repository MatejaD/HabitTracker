// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBfgyQS93qiVnl0d-IafWtj7tC3CfaCaxU",
    authDomain: "habit-tracking-app-349417.firebaseapp.com",
    projectId: "habit-tracking-app-349417",
    storageBucket: "habit-tracking-app-349417.appspot.com",
    messagingSenderId: "666414834636",
    appId: "1:666414834636:web:df3c43ffb94a5de160f369",
    measurementId: "G-100WDZ2CT4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
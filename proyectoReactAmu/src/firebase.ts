// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoX5RYe3oCBva8SkPIMuo_KOjU4qUEP7Q",
  authDomain: "react-amu-videojuegos.firebaseapp.com",
  projectId: "react-amu-videojuegos",
  storageBucket: "react-amu-videojuegos.firebasestorage.app",
  messagingSenderId: "1003743897395",
  appId: "1:1003743897395:web:93dd4eb2abe6e8eb588046",
  measurementId: "G-2M54Y789X2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
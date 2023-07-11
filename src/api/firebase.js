// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_soohgbMbJwHBMAMikPgDBBHB5zPTc14",
  authDomain: "anon-cadb6.firebaseapp.com",
  projectId: "anon-cadb6",
  storageBucket: "anon-cadb6.appspot.com",
  messagingSenderId: "541940004915",
  appId: "1:541940004915:web:5ae2efbb39bf744f728b46",
  measurementId: "G-PS40YV87F1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

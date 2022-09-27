// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvSjWIT62Fd58CKQnjvx47pVK8kjOBopc",
  authDomain: "dixit-9a0b3.firebaseapp.com",
  projectId: "dixit-9a0b3",
  storageBucket: "dixit-9a0b3.appspot.com",
  messagingSenderId: "558439881046",
  appId: "1:558439881046:web:9eb0bdb32bd4a8b3cfdef7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

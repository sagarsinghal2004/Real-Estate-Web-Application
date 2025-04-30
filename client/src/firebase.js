// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-25a76.firebaseapp.com",
  projectId: "mern-estate-25a76",
  storageBucket: "mern-estate-25a76.appspot.com",
  messagingSenderId: "285980051242",
  appId: "1:285980051242:web:8388560409b226e19e4053"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
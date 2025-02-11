// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAlLjyOX1vgoAbj5DLeKKaB2CM41N1N3w4",
  authDomain: "intelligent-video-survei-d578b.firebaseapp.com",
  projectId: "intelligent-video-survei-d578b",
  storageBucket: "intelligent-video-survei-d578b.appspot.com",
  messagingSenderId: "667766315768",
  appId: "1:667766315768:web:6520b78035530592e7b90d",
  measurementId: "G-NP9B4X73CD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

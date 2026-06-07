// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVLOBbGGtc4uYlBOQ-1daElUD2DAWtDbE",
  authDomain: "pastex-16ce9.firebaseapp.com",
  projectId: "pastex-16ce9",
  storageBucket: "pastex-16ce9.firebasestorage.app",
  messagingSenderId: "312058039478",
  appId: "1:312058039478:web:52521fcad656c89284aa17"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

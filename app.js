// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC52iSxyJuJom9M7vOi-w8MWUHQBPdYFxQ",
  authDomain: "link-in-bio-2026.firebaseapp.com",
  projectId: "link-in-bio-2026",
  storageBucket: "link-in-bio-2026.firebasestorage.app",
  messagingSenderId: "984201807172",
  appId: "1:984201807172:web:dd12a2506d96bee23c8311",
  measurementId: "G-2976PFNT4H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
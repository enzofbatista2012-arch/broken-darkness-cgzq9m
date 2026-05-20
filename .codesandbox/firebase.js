// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJobJPgUnFww4IsPLLlmQd1CHHGI3MRYw",
  authDomain: "studypoin-bd9a1.firebaseapp.com",
  projectId: "studypoin-bd9a1",
  storageBucket: "studypoin-bd9a1.firebasestorage.app",
  messagingSenderId: "986779444987",
  appId: "1:986779444987:web:5b7462a0dade4b9dc0f25e",
  measurementId: "G-M73MJMKWFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
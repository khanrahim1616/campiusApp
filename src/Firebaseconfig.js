import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMoHsGXHOFQRsiWmm-PW8Jejbv4hsE1sg",
  authDomain: "campus-app-c584a.firebaseapp.com",
  projectId: "campus-app-c584a",
  storageBucket: "campus-app-c584a.appspot.com",
  messagingSenderId: "141714188476",
  appId: "1:141714188476:web:266d6c87e08cd795c488b9",
  measurementId: "G-QF9VBEY699",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

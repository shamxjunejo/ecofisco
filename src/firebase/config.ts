import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDn_DUfKg6k6pXNWLjxbUQGpd_KsgCotKQ",
    authDomain: "ecofisco-bccc2.firebaseapp.com",
    projectId: "ecofisco-bccc2",
    storageBucket: "ecofisco-bccc2.firebasestorage.app",
    messagingSenderId: "825645680379",
    appId: "1:825645680379:web:65c1127961d7cbfab7925e",
    measurementId: "G-GVR41XL0DX"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
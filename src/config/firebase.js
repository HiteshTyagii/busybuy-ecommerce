import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhfUz-gDjfd02he2OiNyBsWhMBIppqlMw",
  authDomain: "busybuy-b3b21.firebaseapp.com",
  projectId: "busybuy-b3b21",
  storageBucket: "busybuy-b3b21.firebasestorage.app",
  messagingSenderId: "350604267077",
  appId: "1:350604267077:web:c4b073b8e1af6305195d2c",
  measurementId: "G-T1LKHJJCN1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/firestore/quickstart?hl=ja&authuser=0
// データを保存する
import { getFirestore } from "firebase/firestore";
//  storageを使う
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "tutorial-eff0d.firebaseapp.com",
  projectId: "tutorial-eff0d",
  storageBucket: "tutorial-eff0d.appspot.com",
  messagingSenderId: "903470812973",
  appId: "1:903470812973:web:af2d31224b231207becda4",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);

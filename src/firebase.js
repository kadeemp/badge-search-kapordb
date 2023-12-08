// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCam5bkGQ9xeejHOoQQ18KhUTm1MFrwKb4",
  authDomain: "deib-for-startups.firebaseapp.com",
  databaseURL: "https://deib-for-startups-default-rtdb.firebaseio.com",
  projectId: "deib-for-startups",
  storageBucket: "deib-for-startups.appspot.com",
  messagingSenderId: "210485409133",
  appId: "1:210485409133:web:b21888a346ffaf176dd664"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5_YFvCF1EvcYG7kQuT_Pwpzhs_XlgUb0",
  authDomain: "plypicker-10dfc.firebaseapp.com",
  projectId: "plypicker-10dfc",
  storageBucket: "plypicker-10dfc.appspot.com",
  messagingSenderId: "193956007480",
  appId: "1:193956007480:web:7bb6bbdf8cf21a151ea0cd",
  measurementId: "G-1M6QFGMT6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export { storage };


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "findmypg-8ea33.firebaseapp.com",
  projectId: "findmypg-8ea33",
  storageBucket: "findmypg-8ea33.appspot.com",
  messagingSenderId: "198629913823",
  appId: "1:198629913823:web:5731e7ad341ccd54afa56a",
  measurementId: "G-5RTRF0PZD1"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
//  export const analytics = getAnaltics(app);  
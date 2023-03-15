// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4NVsL_DtwztUz54o84fzVKq1xj5NSHkw",
    authDomain: "todo-app-fded2.firebaseapp.com",
    projectId: "todo-app-fded2",
    storageBucket: "todo-app-fded2.appspot.com",
    messagingSenderId: "492673751567",
    appId: "1:492673751567:web:007ac663f6a0b7ab2a217a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
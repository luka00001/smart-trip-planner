import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const FIREBASE_KEY = "AIzaSyCODgqK2GMdzOqQ5TtS7LTDEfWzW3FY3jM";

const config = {
    apiKey: FIREBASE_KEY,
    authDomain: "trip-planner-251a0.firebaseapp.com",
    databaseURL: "https://trip-planner-251a0-default-rtdb.firebaseio.com/",
    projectId: "trip-planner-251a0",
    storageBucket: "trip-planner-251a0.appspot.com",
    messagingSenderId: "832956111986",
    appId: "1:832956111986:web:f9a46bfd2e3c9bbf1936eb"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
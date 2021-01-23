import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXAOTKaLmxfGdV46q_QJMRzfcSScKti0o",
  authDomain: "start-your-day-302523.firebaseapp.com",
  projectId: "start-your-day-302523",
  storageBucket: "start-your-day-302523.appspot.com",
  messagingSenderId: "44989049289",
  appId: "1:44989049289:web:23603d71f3e9708366a018",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

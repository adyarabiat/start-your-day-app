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
// ..........................................................

// Store the user in our database:
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  // create the document by setting the user UID
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // it will give me the exist property and it will be true or false

  const snapShot = await userRef.get();

  // if it was false we will create it
  if (!snapShot.exists) {
    // get the name and the email
    const { displayName, email } = userAuth;
    // when it was created
    const createdAt = new Date();

    try {
      // .set it will store the data
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

export default firebase;

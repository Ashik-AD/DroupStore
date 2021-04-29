import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firebase-firestore'
import firebaseConfig from './firebase.config';
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const fireStore = firebase.firestore();

export default firebase

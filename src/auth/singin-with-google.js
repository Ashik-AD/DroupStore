import firebase from 'firebase/app';
import 'firebase/auth';

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompts: 'select_account' });

export const signupWithGoogle = () => {
    firebase.auth().signInWithPopup(provider);
    console.log('Auth is completed')
};

import firebase from 'firebase/app';
import { auth } from '../firebaseConfig/firebase.util';
firebase.app();

const SigninWithEmailAndPassword = async (eml, pwd) => {
    const email = eml;
    const password = pwd;
    try {
        const startAuth = await auth.signInWithEmailAndPassword(email, password);
        const getUser = await startAuth.user;
        console.log("Successfully Signin");
        return getUser;
    }
    catch (error) {
        console.log("Error: Faild to Signin");
        return false;
    }
}

export default SigninWithEmailAndPassword;
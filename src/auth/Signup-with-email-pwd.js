import { auth } from '../firebaseConfig/firebase.util';

const SignupWithEmailAndPassword = async (eml, pwd) => {
    const email = eml;
    const password = pwd;
    try {
        const startAuth = await auth.createUserWithEmailAndPassword(email, password);
        const response = await startAuth.user;
        return response;
    }
    catch (error) {
        console.log('Error: Faild to create account');
        return;
    }
}

export default SignupWithEmailAndPassword;
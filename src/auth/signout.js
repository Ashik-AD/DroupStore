import { auth } from '../firebaseConfig/firebase.util';
const userSignOut = async () => {
    try {
        await auth.signOut();
        console.log("Signout successfully");
    }
    catch (error) {
        console.log("Error: Can't not signout.\nPlease try again.");
        console.log(error)
    }
}

export default userSignOut
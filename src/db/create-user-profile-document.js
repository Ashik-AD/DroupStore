import { fireStore } from '../firebaseConfig/firebase.util';

const createUserProfileDocument = async (uid, addtional) => {
    const reqToStore = await fireStore.collection('users').doc(`${uid}`);
    const snapShot = await reqToStore.get();
    if (!snapShot.exists) {
        try {
            const createdAt = new Date();
            await fireStore.collection('users').doc(uid).set({ createdAt, ...addtional });
            console.log("Document successfully created");
            return await snapShot.data();
        }
        catch (error) {
            console.log("Cant create user profile to the database");
            return;
        }
    }
    return await snapShot.data();
}

export default createUserProfileDocument;
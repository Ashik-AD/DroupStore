import { fireStore } from '../firebaseConfig/firebase.util';

const createUserProfileDocument = async (uid, addtional) => {
    const reqToStore = await fireStore.collection('users').doc(`${uid}`);
    const snapShot = await reqToStore.get();
    if (!snapShot.exists) {
        try {
            const createdAt = new Date();
            await fireStore.collection('users').doc(uid).set({ createdAt, ...addtional });
            return await snapShot.data();
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    return await snapShot.data();
}

export default createUserProfileDocument;
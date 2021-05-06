import { fireStore } from '../firebaseConfig/firebase.util';

class StoreDelete {
    constructor(uid, path) {
        this.path = path;
        this.uid = uid;
    }

    deleteCollection = async (items) => {
        items.forEach(id => this.collectionRef(id))
    }
    collectionRef = async (id) => {
        try {
            await fireStore.collection('user_shop').doc(this.uid).collection(this.path).doc(id).delete();
            return true;
        }
        catch (error) {
            console.error(`Can't delete collection`);
            return;
        }
    }
}

export default StoreDelete
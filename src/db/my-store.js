import { fireStore } from '../firebaseConfig/firebase.util';

class Store {
    constructor(uid, pathName) {
        this.collection_name = pathName;
        this.user_ID = uid;
        this.data = [];
    }

    addToMyStore = async (data) => {
        // User must be authorized
        if (!this.isAuthUser) return false;
        //Item must be have ID property
        if (!data.hasOwnProperty('id')) return false;

        const checkItemInStore = await this.hasItemInShop(data.id);
        if (!checkItemInStore) {
            const addItemToStore = await this.setItem(data);
            return {
                data: addItemToStore,
                msg: `This item is added to your ${this.collection_name}`,
                type: 'info',
                isSomethingWrong: false,
            };
        }
        return {
            data: '',
            msg: `This item is already in your ${this.collection_name}`,
            type: 'warn',
            isSomethingWrong: true
        };
    }

    GetItem = async (id) => {
        try {
            const storeRef = fireStore.collection('user_shop').doc(`${this.user_ID}`).collection(`${this.collection_name}`);
            const snapShot = await storeRef.get();

            return snapShot;
        
        }
        catch (error) {
            console.log("Error: DB error");
            return;
        }
    }
    
    hasItemInShop = async (id) => {
        try {
            const store = await fireStore.collection('user_shop').doc(this.user_ID).collection(this.collection_name).doc(id).get();
            return store.exists;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    setItem = async (data) => {
        if (!data) return false;
        try {
            const store = await fireStore.doc(`user_shop/${this.user_ID}/${this.collection_name}/${data.id}`).set({ ...data });
            return store;
        }
        catch (error) {
            console.log('Cant add to the database');
            console.log(error.code);
            return;
        }
        finally {
            console.log('Database op complete');
        }
    }

    // Whether user Authorized or Not
    isAuthUser = async () => {
        const store = await fireStore.collection('user').doc(this.user_ID).get();
        return store.exists;
    }

    queryString = (uid, colName, docId = '') => {
        return docId !== '' ? `user_shop/${uid}/${colName}/${docId}`
            :
            `user_shop/${uid}/${colName}`
    }
}

export default Store;
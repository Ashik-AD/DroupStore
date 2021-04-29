import React, { useState, useContext } from 'react';
import { UserContext } from './UserProvider';
import Store from '../db/my-store';

const UserItemContext = React.createContext();
function UserItemProvider(props) {
    const [cartItem, setCartItem] = useState([]);
    const [favItem, setFavItem] = useState([]);
    const { currentUser: { id } } = useContext(UserContext);
    console.log(id);
    useContext(() => {
        let subscribeCartStore = null;
        let subscribeFavStore = null;
        subscribeCartStore = async () => {
            const cartRef = new Store(id, 'cart').GetItem();
            const snapShot = await cartRef;
            const items = [];
            snapShot.forEach(doc => {
                items.push(doc.data());
            });
            setCartItem(items);
        }
        subscribeFavStore = async () => {
            const favRef = new Store(id, 'fav').GetItem();
            const snapShot = await favRef;
            const items = [];
            snapShot.forEach(doc => {
                items.push(doc.data());
            });
            setFavItem(items);
        }
        return () => {
            subscribeCartStore();
            subscribeFavStore();
        }
    }, []);
    return (
        <UserItemContext.Provider value={{cartItem, favItem,}}>
            {props.children}
        </UserItemContext.Provider>
    )
}

export default UserItemProvider

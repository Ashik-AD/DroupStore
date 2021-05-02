import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './UserProvider';
import Store from '../db/my-store';

export const UserItemContext = React.createContext();

function UserItemProvider(props) {
    const [cartItem, setCartItem] = useState([]);
    const [favItem, setFavItem] = useState([]);
    const { currentUser} = useContext(UserContext);
    const id = currentUser.id
    useEffect(() => {
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
            const favRef = new Store(id, 'favorite').GetItem();
            const snapShot = await favRef;
            const items = [];
            snapShot.forEach(doc => {
                items.push(doc.data());
            });
            setFavItem(items);
        }
        subscribeCartStore();
        subscribeFavStore();
        return () => {
            subscribeCartStore();
            subscribeFavStore();
        }
    }, [id]);

    const updateCorrespondingState = (state_name, item) => {
        const oldState = state_name === 'cart' ? cartItem : favItem;
        const updatedItem = [].concat(oldState);
        updatedItem.push(item);
        state_name === 'cart' ? setCartItem(updatedItem) : setFavItem(updatedItem);
    }

    return (
        <UserItemContext.Provider value={{cartItem, favItem, updateCorrespondingState}}>
            {props.children}
        </UserItemContext.Provider>
    )
}

export default UserItemProvider

import React, { useContext } from 'react';
import { UserItemContext } from '../../context/UserItemProvider';
import { UserContext } from '../../context/UserProvider';
import StoreDelete from '../../db/delete-store';

function ButtonRemove(props) {
    const { label, handleClearPrevState } = props;
    const {currentUser: {id}} = useContext(UserContext);
    const { clearCorrespondingState, cartItem, favItem } = useContext(UserItemContext);
    
    const handleDelete = async () => {
        const item_id = getId();
        const storeRef = new StoreDelete(id, label);
        try {
            await storeRef.deleteCollection(item_id);
            clearCorrespondingState(label.toLowerCase());
            return handleClearPrevState !== undefined ? handleClearPrevState() : null
        }
        catch (error) {
            console.error(error);
            return;
        }
    }
    const getId = () => {
        const items = label.toLowerCase() === 'cart' ? cartItem : favItem;
        const ids = items.map(el => el.id);
        return ids;
    }

    return (
        <button className="btn-clear" onClick={handleDelete}>
            {props.children}
        </button>
    )
}

export default ButtonRemove

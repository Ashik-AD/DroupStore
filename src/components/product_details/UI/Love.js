import React, { useContext } from 'react';
import { UserItemContext } from '../../../context/UserItemProvider';
import { UserContext } from '../../../context/UserProvider';
import Store from '../../../db/my-store';

function Love(props) {
    const { currentUser } = useContext(UserContext);
    const { favItem } = useContext(UserItemContext);
    const { updateCorrespondingState } = useContext(UserItemContext);

    const handelClick = async (event) => {
        event.target.classList.toggle('fav-active');
        const hasId = currentUser.hasOwnProperty('id');
        if (hasId && currentUser.id !== '') {
            const id = currentUser.id;
            const data = {...props.id };
            await new Store(id, 'favorite',).addToMyStore(data);
            updateCorrespondingState('fav', data);
            const haveFav = isFav();
            if (haveFav) {
                event.target.name = 'heart-outline';
                return;
            }
            else {
                event.target.name = 'heart';
                return;
            }
        }
    }
    const isFav = () => {
        const check = favItem.findIndex(el => el.id === props.id.id);
        return check === -1 ? false : true;
    }
    const ds = {
        position: 'relative',
        right: 0,
        margin: 10,
        display: 'inherit'
    }
    return (
        <span className='icon' style={!props.pos ? ds : null}>
            <ion-icon  name={`heart${isFav() ? '': '-outline'}`} onClick={handelClick} />
        </span>
    )
}

export default Love

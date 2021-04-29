import React from 'react'
import Storage from '../../../utils/Storage';

function Love(props) {
    const ds = {
        position: 'relative',
        right: 0,
        margin: 10,
        display: 'inherit'
    }
    const handelClick = (event) => {
        const data = {...props.id };
        const favItem = new Storage('fav').getItems();
        event.target.classList.toggle('fav-active');
        const haveFav = isFav();
        if (haveFav) {
            let fav = newFav(data.id, favItem);
            event.target.name = 'heart-outline';
            addItem(fav);
            return;
        }
        else {
            event.target.name = 'heart';
            addItem(data);
            return;
        }
    }
    const addItem = (data) => {
        let items = new Storage('fav').getItems();
        if (data.length) {
            items = data;
        }
        else {
            items.push(data);
        }
        console.log(items)
        localStorage.setItem('fav', JSON.stringify(items));
        return;
    }
    const isFav = () => {
        const favItem = new Storage('fav').getItems();
        const check = favItem.findIndex(el => el.id === props.id.id);
        return check === -1 ? false : true;
    }
    const newFav = (id, items) => {
        const index = items.findIndex(el => el.id === id);
        items.splice(index, 1);
        return items;
    }
    return (
        <span className='icon' style={!props.pos ? ds : null}>
            <ion-icon class={isFav() ? 'fav-active' : ''} name={`heart${isFav() ? '': '-outline'}`} onClick={handelClick} />
        </span>
    )
}

export default Love

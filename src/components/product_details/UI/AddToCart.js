import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { CounterContext } from '../../../context/CountProvider';
import { SignupContext } from '../../../context/SignupProvider';
import { UserContext } from '../../../context/UserProvider';
import Alert from '../../UI/Alert';
import Store from '../../../db/my-store';
function AddToCart(props) {
    const [isShow, setShow] = useState(false);
    const [info, setInfo] = useState({msg: '', type: ''})
    const { isSignIn } = useContext(SignupContext);
    const { handelCount } = useContext(CounterContext);
    const { currentUser } = useContext(UserContext);
    const redirect = useHistory();
    
    const handelClick = async () => {
        const { id } = currentUser;
        const { name, price, color, imgArr, size } = props.data;
        if (isSignIn) {
            const cartInfo = {
                id: props.data.id,
                name,
                price,
                color: color[0],
                imgArr: imgArr[0],
                size: size[0]
            }
            const addToStore = await new Store(id, 'cart', cartInfo.id).AddToCart(cartInfo);
            const { data, msg, type } = addToStore;
            console.log(data)
            // const cartItem = new AddToUserShop();
            setInfo({ msg, type });
            setShow(prevState => prevState >= null);
        }
        else {
            redirect.push('/signup');
        }
    }
    return (
        <>
            <button className="add-to-cart" style={{margin: '10px 0'}} onClick={handelClick}>
                ADD TO CART
            </button>
            {isShow ? <Alert msg={info.msg} type={info.type} /> : null}
        </>
    )
}

export default AddToCart

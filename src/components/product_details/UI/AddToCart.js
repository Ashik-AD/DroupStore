import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SignupContext } from '../../../context/SignupProvider';
import { UserContext } from '../../../context/UserProvider';
import Alert from '../../UI/Alert';
import Store from '../../../db/my-store';
import { UserItemContext } from '../../../context/UserItemProvider';
function AddToCart(props) {
    const [isShow, setShow] = useState(false);
    const [info, setInfo] = useState({msg: '', type: ''})
    const { isSignIn } = useContext(SignupContext);
    const { currentUser } = useContext(UserContext);
    const { updateCorrespondingState } = useContext(UserItemContext);
    const redirect = useHistory();
    
    const handelClick = async () => {
        const { id } = currentUser;
        const { name, price, color, imgArr, size } = props.data;
        if (isSignIn) {
            let cartInfo = {
                id: props.data.id,
                name,
                price,
                color: color[0],
                imgArr: imgArr[0],
                size: size[0]
            }
            const addToMyCart = await new Store(id, 'cart', cartInfo.id).addToMyStore(cartInfo);
            const { msg, type, isSomethingWrong } = addToMyCart;
            setInfo({ msg, type });
            setShow(prevState => prevState >= null);
            if (!isSomethingWrong) {
                updateCorrespondingState('cart', cartInfo);
            }
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

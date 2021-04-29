import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SignupContext } from '../../context/SignupProvider';
import Confirm from './Confirm';
import userSignOut from '../../auth/signout'
import css from './User.module.css';
function User() {
    const [showDrp, setDrp] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const handelDrp = () => {
        setDrp(prevState => !prevState);
    }
    useEffect(() => {
        window.addEventListener('click', event => {
            if (event.target.classList.contains('user-name') || event.target.dataset.id === 'user-avatar') {
                setDrp(prevState => prevState);
            }
            else {
                setDrp(false);
            }
        });
        return () => {
            window.removeEventListener('click', this);
        }
    }, [showDrp]);

    const colors = ['#206a5d', '#b34180'];
    const redirect = useHistory();

    const { handleSignOut, userName } = useContext(SignupContext);

    const handleLogout = () => {
        setConfirm(true);
    }
    const handleConfirm = () => {
        setConfirm(false);
        handleSignOut();
        userSignOut();
        redirect.push('/');
    }
    const handleCancel = () => {
        setConfirm(false);
    }

    return (
        <div style={{ position: 'relative' }}>
            {confirm ? <Confirm handleCancel={handleCancel} handleConfirm={handleConfirm} /> : null}
            <div className={css.Avatar} style={{background: colors[userName ? randomNumber(userName.split(" ")[0]) : 0]}} onClick={handelDrp} data-id="user-avatar">
                {userName.split('')[0]}
            </div>
            <div className={showDrp ? css.drp : css.hideDrp}>
                <div style={{textAlign: 'center', lineHeight: 2, fontSize: 15, fontWeight: 600, borderBottom: '2px solid #f0f0f055'}} className="user-name">{userName}</div>
                <ul>
                    <li><Link to="/cart"><ion-icon name="cart-outline" />My Cart</Link></li>
                    <li><Link to="/my-favourite" ><ion-icon name="heart" /> My Favourite</Link></li>
                    <li onClick={handleLogout}><ion-icon name="log-out-outline"/> Sign Out</li>
                </ul>
            </div>
        </div>
    )
}
function randomNumber(string) {
    return string.length > 5 ? 0 : 1;
}
export default User

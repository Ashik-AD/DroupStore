import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SignupContext } from '../../../context/SignupProvider';
import User from '../../user/User';
import Logo from '../logo/Logo';
import css from './Nav.module.css';
import ButtonCart from './navUI/ButtonCart';
function Nav() {
    const nav = [
        {
            id: 1,
            label: 'Shop',
            path: 'shop'
        },
        {
            id: 2,
            label: 'How it works',
            path: 'how-it-works'
        },
        {
            id: 3,
            label: 'Retailers',
            path: 'retailers'
        },
    ]
    const flex = {
        display: 'flex',
        alignItems: 'center'
    }
    const navItemStyle = {
        margin: '0 10px',
        fontWeight: 600,
        fontSize: 14
    }
    const { isSignIn } = useContext(SignupContext);
    return (
        <nav className={css.Nav}>
            <Link to="/">
                <Logo style={flex} />
            </Link>
            <div style={flex}>
                <Link to="signup" style={navItemStyle} title="sign up" className={css.des_show}>Sign Up</Link>
                <Link to="signin" style={navItemStyle} title="sign in" className={css.des_show}>Sign In</Link>
                <ButtonCart />
                {isSignIn ? <User /> : null}
            </div>
        </nav>
    )
}

export default Nav;
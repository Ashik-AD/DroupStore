import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from '../../../../context/CountProvider';
import css from './ButtonCart.module.css';
function ButtonCart() {
    const { productCount } = useContext(CounterContext);
    return (
        <Link to="/cart" className={css.cart}>
            <ion-icon style={{ fontSize: 20, color: 'hotpink' }} name="cart-outline" />
            <span className="badge">{productCount}</span>
        </Link>
    )
}

export default ButtonCart

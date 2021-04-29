import React, {useState} from 'react'
import Space from '../../header/Space';
import css from './CartTotal.module.css'
function CartTotal(props) {
    const [isTerm, setTerm] = useState(false);
    const handelClick = () => {
        console.log('not')
    }
    const handelTermNCondition = () => {
        setTerm(prevTerm => !prevTerm);
    }
    return (
        <div className={css.cartTotal}>
            <Space />
            <div className={css.border}></div>
            <div className={css.total}>
                <p>Cart Total: <strong>${props.total}USD</strong></p>
                <p className={css.tax_tc}>Shipping and Taxes calculated at checkout.</p>
            </div>
            <div className={css.tnc}>
                <input type="checkbox" name="tc" onChange={handelTermNCondition} checked={isTerm} />
                I agree to Terms & Conditions
            </div>
            <div className={css.btn_wrapper}>
                <button className={css.check_out} disabled={!isTerm} onClick={handelClick} style={{cursor: !isTerm ? 'not-allowed' : null}}>
                    Checkout
                    <ion-icon name="arrow-forward-outline"></ion-icon>
                </button>
                <button className={css.payNow} disabled={!isTerm}>
                    <ion-icon name="card-outline"></ion-icon>
                    PayPal
                </button>
            </div>
        </div>
    )
}

export default CartTotal

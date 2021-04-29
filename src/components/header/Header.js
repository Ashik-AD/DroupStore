import React from 'react'
import CallTOAct from './calltoact/CallTOAct'
import css from './Header.module.css'
const Header = props => {
    return (
        <div className={css.Header}>
            <div className={css.overlap}>
                <CallTOAct />
            </div>
        </div>
    )
}
export default Header;
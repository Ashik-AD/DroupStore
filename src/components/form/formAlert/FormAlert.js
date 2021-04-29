import React, { useState, useEffect } from 'react'
import css from './FormAlert.module.css'
function FormAlert({isShow, msg, handler}) {
    const [isAlert, setAlert] = useState(isShow);
    useEffect(() => {
        const closeAlert = setTimeout(() => {
            setAlert(prevState => !prevState);
            handler();
        }, 3000);

        return () => {
            clearTimeout(closeAlert);
        };
    }, [handler]);
    return (
        <div className={isAlert ? css.warn : css.hide}>
            {msg}
        </div>
    )
}

export default FormAlert

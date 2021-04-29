import React from 'react'
import alertWrapper from '../HOC/alertWrapper';
import css from './css/Alert.module.css'
function Alert({ msg, type }) {
    const color = {
        backgroundColor: type === 'info' ? '#f875aa' : '#ffb037'
    }
    return (
        <div className={css.AlertWrapper}>
            <span style={color} className={css.Alert}>
                {msg}
            </span>
        </div>
    )
}

export default alertWrapper(Alert)

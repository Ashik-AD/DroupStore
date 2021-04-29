import React from 'react'

function FormInput({type, name, label, handler, value, placeholder, id, forwardedRef, style}) {
    return (
        <label style={style}>
            <p style={ type === 'checkbox' ? {cursor: 'pointer'} : null}>{label}</p>
            <input type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                className={id}
                onChange={handler}
                ref={forwardedRef}
                style={type === 'checkbox' ? {margin: '0 10px'}: null}
                />
        </label>
    )
}

export default FormInput

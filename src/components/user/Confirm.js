import React from 'react'

function Confirm({handleCancel, handleConfirm}) {
    const btnStyle = {
        padding: '5px 15px',
        backgroundColor: 'hotpink',
        border: '2px solid hotpink',
        margin: 10,
        borderRadius: '4px',
        fontSize: '16px',
        fontWeight: 600,
        color: '#fff',
        cursor: 'pointer'
    }
    return (
        <div style={{
            position: 'fixed', width: '100vw', height: '100vh', top: 0, left: 0,
            backgroundColor: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center'
        }}>
            <h1>Are your sure?</h1>
            <div>
                <button style={btnStyle} onClick={handleCancel}>Cancel</button>
                <button style={btnStyle} onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default Confirm

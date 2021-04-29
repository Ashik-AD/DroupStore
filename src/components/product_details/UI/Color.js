import React from 'react'
import Title from './Title';

function Color({colors, handleColor}) {
    return (
        <div className="colors">
            <Title title="Color" />
            <div className="color-wrapper" style={{ display: 'flex'}}>
                {
                    colors.map((el, index) => <span key={index} style={{ background: el, height: 40, width: 40, borderRadius: "50%", border: '2px solid hotpink', cursor: 'pointer', marginRight: 10}} onClick={() => handleColor(el)} />)
                }
            </div>
        </div>
    )
}

export default Color

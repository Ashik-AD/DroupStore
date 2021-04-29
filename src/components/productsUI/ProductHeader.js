import React from 'react'
const ProductHeader = ({ top, sub, pos }) => {
    const topStyle = {
        fontFamily: "'Cinzel', serif",
        fontSize: "200%"
    }
    const subStyle = {
        fontSize: "220%",
        fontWeight: '600'
    }
    return (
        <div className="seaction-header" style={{display: 'block', marginBottom: 50, textAlign: pos === 'right' ? "right" : pos === 'center' ? 'center' : 'left'}}>
            <p style={topStyle}>{top}</p>
            <p style={subStyle}>{sub}</p>
        </div>
    )
}

export default ProductHeader

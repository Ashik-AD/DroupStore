import React from 'react'

function ProductName({name, price}) {
    return (
        <div className="product-name" style={{fontSize: 25, fontWeight: 600}}>
            {name}
            <p style={{fontSize: 18, color: 'hotpink'}}>${price} USD</p>
        </div>
    )
}

export default ProductName

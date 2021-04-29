import React from 'react'
import './css/ProductList.css'
const ProductLIst = props => {
    return (
        <div className={props.column}>
            {props.children}
        </div>
    )
}

export default ProductLIst

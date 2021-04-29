import React from 'react'

function TableHead() {
    return (
        <div className="t-head">
            <div className="row">
                <span className="th product">Product</span>
                <span className="th price">price</span>
                <span className="th qty">qty</span>
                <span className="th total">total</span>
            </div>
        </div>
    )
}

export default TableHead

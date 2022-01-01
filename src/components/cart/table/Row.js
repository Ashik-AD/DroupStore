import React from 'react'
import { Link } from 'react-router-dom';
import Flex from '../../UI/Flex'
function Row(props) {
    const {name, size, color, price, handelCountProduct, qnt, id, total, imgArr} = props;
    return (
        <div className="row">
            <span className="td product">
                <Flex>
                    <span className="image">
                        <Link to={`product/${name}`}>
                            <img src={imgArr.hasOwnProperty('url') ? imgArr.url : imgArr[0].url} alt={name} />
                        </Link>
                    </span> 
                    <div className="pro-meta">
                        <Link to={`product/${name}`}>
                            <p className="name">{name}</p>
                        </Link>
                        <div>
                            <span className="size">Size: {size[0]}</span>
                            <span className="color">Color: {color}</span>
                        </div>
                    </div>
                </Flex>
            </span>
            <span className="td price">
                ${price}
            </span>
            <span className="td qty">
                <>
                    <div>
                        <button onClick={() => handelCountProduct(id, 'dec')}>−</button>
                        <span className="total-qnt">{qnt}</span>
                        <button onClick={() => handelCountProduct(id, 'inc')}>+</button>
                    </div>
                </>
            </span>
            <span className="td total">
                ${total}
            </span>
        </div>
    )
}

export default Row

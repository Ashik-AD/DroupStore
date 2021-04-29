import React from 'react'
import { Link } from 'react-router-dom';
import Flex from '../../UI/Flex'
function Row(props) {
    return (
        <div className="row">
            <span className="td product">
                <Flex>
                    <span className="image">
                        <Link to={`product/${props.name}`}>
                            <img src={props.imgArr.url} alt={props.name} />
                        </Link>
                    </span>
                    <div className="pro-meta">
                        <Link to={`product/${props.name}`}>
                            <p className="name">{props.name}</p>
                        </Link>
                        <div>
                            <span className="size">Size: {props.size[0]}</span>
                            <span className="color">Color: {props.color}</span>
                        </div>
                    </div>
                </Flex>
            </span>
            <span className="td price">
                ${props.price}
            </span>
            <span className="td qty">
                <>
                    <div>
                        <button onClick={() => props.handelCountProduct(props.id, 'dec')}>−</button>
                        <span className="total-qnt">{props.qnt}</span>
                        <button onClick={() => props.handelCountProduct(props.id, 'inc')}>+</button>
                    </div>
                </>
            </span>
            <span className="td total">
                ${props.total}
            </span>
        </div>
    )
}

export default Row

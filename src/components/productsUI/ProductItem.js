import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './css/ProductItem.css';
import { v4 as uuidv4 } from 'uuid';
import Love from '../product_details/UI/Love';
import AddToCart from '../product_details/UI/AddToCart';
function ProductItem(props) {
    const { name, price, imgArr, color } = props;
    const [curImage, setCurImage] = useState(typeof imgArr[0] !== 'string' && typeof imgArr[0] !== 'object' ? imgArr[color[0]] : imgArr); // return false if Item is array
    const history = useHistory();
    const imgList = {
        display: 'flex',
        flexWrap: 'nowrap',
        width: '100%',
        height: '350px',
        overflow: 'hidden'
    }
    const width = useRef();
    const imgRef1 = useRef();
    const imgRef2 = useRef();
    const refs = [imgRef1, imgRef2];
    const img = {
        height: 'auto',
        width: '100%',
        transition: 'all .4s ease-in-out'
    }
    const handelClick = () => {
        history.push(`/product/${name}`)
    }
    const handleImage = (cl) => {
        if (color.length > 1) {
            setCurImage(imgArr[cl]);
        }
        return false;
    }
    useEffect(() => {
        return () => {
            window.removeEventListener(onmouseover, handelMouseMove);
            window.removeEventListener(onmouseleave, handelMouseLeave);
        }
    })
    const handelMouseMove = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (curImage.length > 1) {
            imgRef2.current.className = 'animate-right'
            imgRef1.current.className = 'animate-left'
        }
    }
    const handelMouseLeave = (event) => {
        event.stopPropagation();
        event.preventDefault()
        if (curImage.length > 1) {
            imgRef1.current.className = '';
            imgRef2.current.className = '';
        }
    }

    return (
        <div style={{margin: '20px 15px'}}  className="product-item" onMouseOver={handelMouseMove} onMouseLeave={handelMouseLeave}>
            <div className="img_bg" style={imgList} ref={width} onClick={handelClick}>
                {
                    curImage.map((el, index) => <img key={uuidv4()} src={el.url} alt={name} style={img} ref={refs[index]} />)
                }

            </div>
            <article className="meta" style={{textAlign: 'left'}}>
                <div style={{ position: 'relative'}}>
                    <span className="name" onClick={handelClick}>{name}</span>
                    <Love id={props} pos={true} />
                </div>
                <div className="colors" style={{paddingTop: 5}}>
                    {
                        color.map((el, index) => <span key={index} style={{ display: 'inline-block', backgroundColor: el, height: 20, width: 20, borderRadius: '50%', border: '3px solid hotpink', margin: '0px 5px'}} onClick={() => handleImage(el)} />)
                    }
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between',alignItems: 'center', marginTop: 0}}>
                    <span className="price">${price}USD</span>
                    <AddToCart data={props} />
                </div>
            </article>
        </div>
    )
}

export default ProductItem

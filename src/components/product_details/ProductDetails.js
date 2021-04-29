import React, { useState } from 'react';
import Flex from '../UI/Flex';
import AddToCart from './UI/AddToCart';
import Color from './UI/Color';
import DetailList from './UI/DetailList';
import Image from './UI/Image';
import Love from './UI/Love';
import ProductName from './UI/ProdcutName';
import Size from './UI/Size';

function ProductDetails(props) {
    const { images, name, price, details, color, size, id } = props.data;
    const [curSize, setCurSize] = useState('');
    const [curColor, setCurColor] = useState('');
    const [curImage, setCurImage] = useState(typeof images[0] !== 'string' && typeof images[0] !== 'object' ? images[color[0]] : images); // return false if item is
    const data = {
        color: curColor,
        name,
        imgArr: [curImage],
        size: curSize,
        id,
        price
    }
    const grid = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr'
    }
    const handleSize = (sz) => {
        setCurSize(sz)
    }
    const handleColor = (clr) => {
        setCurColor(clr)
        if (color.length > 1) {
            setCurImage(images[clr])
            return;
        }
        return;
    }
    return (
        <section style={grid} className="product-details">
            <div>
                <Image images={curImage} />
            </div>
            <div style={{paddingLeft: 50}} className="product-meta">
                <ProductName name={name} price={price}/>
                <Color colors={color} handleColor={handleColor} />
                <Size size={size} handleSize={handleSize}/>
                <br />
                <Flex>
                    <AddToCart data={data} />
                    <Love pos={false} id={{ id: props.data.id }}/>
                </Flex>
                <DetailList list={details} />
            </div>
        </section>
    )
}

export default ProductDetails

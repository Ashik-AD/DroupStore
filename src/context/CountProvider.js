import React, { useState, useEffect } from 'react';
import Storage from '../utils/Storage';
export const CounterContext = React.createContext();

function CountProvider(props) {
    const [productCount, setProductCount] = useState(0);

    useEffect(() => {
        const getItem = new Storage('cart').getItems();
        setProductCount(prevCount => prevCount + getItem.length);
    }, []);

    const handelCount = () => {
        setProductCount(prevCount => prevCount + 1);
    }

    return (
        <CounterContext.Provider value={{ productCount, handelCount }}>
            {props.children}
        </CounterContext.Provider>
    )
}

export default CountProvider

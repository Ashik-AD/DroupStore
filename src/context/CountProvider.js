import React, { useState, useEffect, useContext } from 'react';
import { UserItemContext } from './UserItemProvider';
export const CounterContext = React.createContext();

function CountProvider(props) {
    const [productCount, setProductCount] = useState(0);
    const { cartItem } = useContext(UserItemContext);

    useEffect(() => {
        const length = cartItem.length;
        setProductCount(length);
    }, [cartItem]);
    return (
        <CounterContext.Provider value={{ productCount }}>
            {props.children}
        </CounterContext.Provider>
    )
}

export default CountProvider

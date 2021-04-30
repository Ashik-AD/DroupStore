import React, { useState, useEffect, useContext } from 'react';
import { UserItemContext } from './UserItemProvider';
export const CounterContext = React.createContext();

function CountProvider(props) {
    const [productCount, setProductCount] = useState(0);
    const { cartItem } = useContext(UserItemContext);

    useEffect(() => {
        setProductCount(prevCount => prevCount + cartItem.length);
    }, [cartItem]);

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

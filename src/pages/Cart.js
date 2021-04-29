import React, { useState, useEffect, useContext } from 'react';
import CartTotal from '../components/cart/checkout/CartTotal';
import Row from '../components/cart/table/Row';
import Table from '../components/cart/table/Table';
import Space from '../components/header/Space';
import { UserContext } from '../context/UserProvider';
import Store from '../db/my-store';
function Cart() {
    const [cartItem, setCartItem] = useState([]);
    const [total, setTotal] = useState(0);
    const { currentUser } = useContext(UserContext);
    useEffect(() => {
        let subsrcibeToStore = null;
        subsrcibeToStore = async () => {
            if (currentUser.hasOwnProperty('id')) {
                const items = [];
                const { id } = currentUser;
                const itemRef = new Store(id, 'cart').GetItem();
                const snapShot = await itemRef;
                snapShot.forEach(doc => {
                    items.push(doc.data());
                });
                const addAdditonal = addAdditionalData(items);
                const total = calcTotalPrice(addAdditonal);
                setCartItem(addAdditonal)
                setTotal(total)
            }
        }
        subsrcibeToStore()
        return () => subsrcibeToStore();
    }, [currentUser]);

    const addAdditionalData = (items) => {
        const refined = items.map(el => {
            return {
                ...el,
                qnt: 1,
                total: el.price
            };
        });
        return refined;
    }
    const findTotal = (price, qnt) => parseFloat((price * qnt).toFixed(2));
    
    const handelProductCount = (id, type) => {
        const updatedPro = cartItem.map(el => {
            if (el.id === id) {
                let qnt = el.qnt;
                if (type === 'inc') {
                    qnt++;
                    el.qnt = qnt;
                    el.total = findTotal(el.price, qnt);
                    return el;
                }
                else {
                    if (qnt > 1) {
                        qnt--;
                        el.qnt = qnt;
                        el.total = findTotal(el.price, qnt);
                        return el;
                    }
                    return el;
                }
            }
            return el;
        });
        const totalAmt = updatedPro.reduce((prev, cur) => prev + cur.total,0);
        setCartItem(updatedPro);
        setTotal(totalAmt.toFixed(2));
    }
    const calcTotalPrice = (item) => item.reduce((prev, cur) => prev + cur.total, 0);
    return (
        <section className="cart-wrapper" style={{ height: '100vh', overflowY: 'hidden'}}>
            <div className="col-4-span grid">
                <div className="cart-table-wrapper">
                    <Space />
                    <Table>
                        {
                            cartItem.map(el => <Row key={el.name} {...el} handelCountProduct={handelProductCount} />)
                        }
                    </Table>
                </div>
                <CartTotal total={total} />
            </div>
        </section>
    )
}

export default Cart

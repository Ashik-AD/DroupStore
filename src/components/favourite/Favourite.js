import React, { Component } from 'react'
import Space from '../header/Space'
import ProductLIst from '../productsUI/ProductLIst';
import ProductItem from '../productsUI/ProductItem';
import ProductHeader from '../productsUI/ProductHeader';
import { UserItemContext } from '../../context/UserItemProvider';
class Favourite extends Component {
    render() {
        return (
            <section className="container">
                <Space />
                <ProductHeader top="Your Liked" sub="Cloath" pos="center" />
                <ProductLIst column="col-4">
                    <UserItemContext.Consumer>
                        {
                            ({ favItem }) => (
                                favItem.map(el => <ProductItem key={el.id} {...el}/>)
                            )
                        }
                    </UserItemContext.Consumer>
                </ProductLIst>
            </section>
        )
    }
}
export default Favourite
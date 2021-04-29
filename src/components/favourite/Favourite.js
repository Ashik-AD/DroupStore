import React, { Component } from 'react'
import Space from '../header/Space'
import Storage from '../../utils/Storage';
import ProductLIst from '../productsUI/ProductLIst';
import ProductItem from '../productsUI/ProductItem';
import ProductHeader from '../productsUI/ProductHeader';
class Favourite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favouriteItem: []
        }
    }
    componentDidMount() {
        const getFavouriteItem = new Storage('fav').getItems();
        this.setState({ favouriteItem: getFavouriteItem });
    }
    render() {
        return (
            <section className="container">
                <Space />
                <ProductHeader top="Your Liked" sub="Cloath" pos="center" />
                <ProductLIst column="col-4">
                    {
                        this.state.favouriteItem.map(el => <ProductItem key={el.id} {...el}/>)
                    }
                </ProductLIst>
            </section>
        )
    }
}
export default Favourite
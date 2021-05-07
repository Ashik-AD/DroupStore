import React, { Component } from 'react'
import Space from '../header/Space'
import ProductLIst from '../productsUI/ProductLIst';
import ProductItem from '../productsUI/ProductItem';
import ProductHeader from '../productsUI/ProductHeader';
import { UserItemContext } from '../../context/UserItemProvider';
import ButtonRemove from '../UI/Remove';
class Favourite extends Component {
    state = {
        favItem: []
    }
    componentDidMount() {
        const value = this.context;
        this.setState({favItem: value.favItem})
    }
    handleClearFavorite = () => {
        this.setState({ favItem: [] });
    }
    render() {
        return (
            <section className="container favorite">
                <Space />
                <ProductHeader top="Your Liked" sub="Cloath" pos="center" />
                <div style={{position: 'relative'}}>
                    <ButtonRemove label="favorite" handleClearPrevState={this.handleClearFavorite}>
                        Clear Your Favorite
                    </ButtonRemove>
                </div>
                <ProductLIst column="col-4">
                    {
                        this.state.favItem.map(el => <ProductItem key={el.id} {...el}/>)
                    }
                </ProductLIst>
            </section>
        )
    }
}
Favourite.contextType = UserItemContext;
export default Favourite
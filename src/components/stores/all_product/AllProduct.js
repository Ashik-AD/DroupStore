import React, { Component } from 'react'
import axios from 'axios'
import ProductLIst from '../../productsUI/ProductLIst';
import ProductItem from '../../productsUI/ProductItem';
import ProcessData from '../../../utils/Process'
class AllProduct extends Component {
    state = {
        products: []
    }

    async componentDidMount() {
        const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&content_type=products`);
        const data = await req.data;
        const proc_data = data.items.map(el => new ProcessData().PROC_DATA(el.sys.id, el.fields, data.includes.Asset));
        this.setState({
            products: proc_data
        })
    }

    render() {
        return (
            <section className="container">
                <ProductLIst column="col-4">
                    {
                        this.state.products.map(el => <ProductItem key={el.id} {...el} />)
                    }
                </ProductLIst>
            </section>
        )
    }
}


export default AllProduct
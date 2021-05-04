import React, { Component } from 'react'
import axios from 'axios'
import ProductDetails from '../components/product_details/ProductDetails';
import ProcessData from '../utils/Process'
import Space from '../components/header/Space';
export default class Product extends Component {
    state = {
        productDetail: {},
        isLoading: true
    }
    async componentDidMount() {
        const id = this.props.match.params.id;
        const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&query=${id}`);
        const data = await req.data;
        const processData = new ProcessData().PROC_DATA_RAW(data);
        this.setState({ productDetail: processData, isLoading: false });
    }
    render() {
        return (
            <>
                <Space bg="#F2F0F0"/>
                <div className="container">
                    {
                        !this.state.isLoading ? <ProductDetails data={this.state.productDetail} /> : null
                    }
                </div>
            </>
        )
    }
}

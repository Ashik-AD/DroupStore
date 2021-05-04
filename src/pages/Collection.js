import React, { Component } from 'react';
import axios from 'axios';
import Space from '../components/header/Space';
import ProcessData from '../utils/Process';
import ProductLIst from '../components/productsUI/ProductLIst';
import ProductItem from '../components/productsUI/ProductItem';

class Collection extends Component {
    state = {
        items: []
    }
    async componentDidMount() {
        const params = this.props.match.params.id;
        const firstLetterCap = capitalize(params);
        const name = params === 'New-Arrival' ? 'Newest' : firstLetterCap;
        const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&content_type=collection${name}`);
        const data = await req.data;
        const processData = data.items.map(el => new ProcessData().PROC_DATA(el.sys.id, el.fields, data.includes.Asset))
        this.setState({items: processData})
    }
    render() {
        return (
            <section className="container">
                <Space />
                <ProductLIst column="col-4">
                    {
                        this.state.items.map(el => <ProductItem key={el.id} {...el} /> )
                    }
                </ProductLIst>
            </section>
        )
    }
}

function capitalize(string) {
    const st = string.split('')[0]
    return string ? string.replace(st, st.toUpperCase()) : '';
}

export default Collection

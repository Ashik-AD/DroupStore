import React, { Component } from 'react'
import axios from 'axios'
import ProductHeader from '../../productsUI/ProductHeader'
import ProductCard from '../../productsUI/ProductCard';
import Slider from '../../Slider/Slider'

class FeatureStore extends Component {
    state = {
        items: []
    }
    async componentDidMount() {
        const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&content_type=featuredStore`);
        const data = await req.data;
        const processedData = data.items.map(el => PROC_DATA(el.sys.id, el.fields, data.includes.Asset));
        this.setState({ items: processedData });
    }

    render() {
        const style = {
            margin: '0 15px'
        }
        return (
            <section className="container">
                <ProductHeader top="Featured" sub="Stores" />
                {/* <ProductLIst column="col-4">
                    {
                        this.state.items.map(el => <ProductCard
                            key={el.id}
                            {...el}
                        />)
                    }
                </ProductLIst> */}
                <Slider>
                    {
                        this.state.items.map(el => <ProductCard
                            key={el.id}
                            style={style}
                            {...el}
                        />)
                    }
                </Slider>
            </section>
        )
    }
}

function PROC_DATA(ID, item, asset) {
    const {featuredName, featuredUrl, featuredBanner: { sys: {id}}} = item
    const proc_data = {} // id, storeName, storeURL, storeBanner
    proc_data.id = ID;
    proc_data.name = featuredName;
    proc_data.link = featuredUrl;
        
    asset.forEach(el => {
        if (el.sys.id === id) {
            proc_data.asset = {
                alt: el.fields.title,
                url: el.fields.file.url
            }
            return;
        }
    })
    return proc_data;
}

export default FeatureStore
import React, { Component } from 'react'
import axios from 'axios'
import Header from '../components/header/Header'
import AllProduct from '../components/stores/all_product/AllProduct'
import CategoryList from '../components/stores/categories/CategoryList'
import FeatureStore from '../components/stores/featured/FeatureStore'
import Banner from '../components/banner/Banner'
class Home extends Component {
    state = {
        collection: []
    }
    async componentDidMount() {
        const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&content_type=collecton`);
        const data = await req.data;
        const processedData = data.items.map(el => PROC_DATA(el.sys.id, el.fields, data.includes.Asset)).reverse();
        this.setState({ collection: processedData });
    }
    render() {
        return (
            <>
                <Header />
                <FeatureStore />
                <CategoryList />
                <Banner {...this.state.collection[0]}/>
                <AllProduct />
                <Banner {...this.state.collection[1]}/>
            </>
        )
    }
}
function PROC_DATA(ID, item, image) {
    const {name, banner: { sys: {id}}} = item
    const proc_data = {} // id, storeName, storeURL, storeBanner
    proc_data.id = ID;
    proc_data.name = name;
        
    image.forEach(el => {
        if (el.sys.id === id) {
            return proc_data.imgURL = el.fields.file.url
        }
    })
    return proc_data;
}
export default Home

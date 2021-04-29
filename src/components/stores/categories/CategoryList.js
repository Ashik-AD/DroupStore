import React, { Component } from 'react'
import axios from 'axios'
import ProductHeader from '../../productsUI/ProductHeader'
import CategoryCard from '../../productsUI/CategoryCard';
import Slider from '../../Slider/Slider';

class CategoryList extends Component {
    state = {
        cat: []
    }
    responsive = {
        
      };
    async componentDidMount() {
        const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&content_type=categories`);
        const data = await req.data;
        const processedData = data.items.map(el => PROC_DATA(el.sys.id, el.fields, data.includes.Asset));
        this.setState({ cat: processedData });
    }
    render() {
        return (
            <section className="container">
                <ProductHeader top="Discover Your" sub="STYLE" pos="right" />
                <Slider>
                    {
                        this.state.cat.map(el => <CategoryCard key={el.id} name={el.name} image={el.images} banner={el.banner_id}/>)
                    }
                </Slider>
            </section>
        )
    }
}

function PROC_DATA(ID, items, images) {
    const { name } = items;
    const pr_data = {}
    pr_data.images = []
    const thumb = `${name}-thumb`.toLowerCase();
    images.forEach(el => {
        const title = el.fields.title.toLowerCase()
        if (title === thumb) {
            pr_data.images.push({name: 'thumb', url: el.fields.file.url})
        }
        if (title === name.toLowerCase()) {
            pr_data.images.push({name: 'banner', url: el.fields.file.url})
            pr_data.banner_id = el.sys.id;
        }
    })
    pr_data.images.sort((prev, cur) => {
        const prevName = prev.name.toLowerCase();
        const curName = cur.name.toLowerCase();
        if (prevName > curName) {
            return 1;
        }
        if (prevName < curName) {
            return -1;
        }
        return 0;
    });
    pr_data.name = name;
    pr_data.id = ID;
    return pr_data;
}

export default CategoryList
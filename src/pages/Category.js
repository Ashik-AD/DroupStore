import React, { Component } from 'react'
import axios from 'axios'
import ProcessData from '../utils/Process'
import ProductHeader from '../components/productsUI/ProductHeader';
import ProductLIst from '../components/productsUI/ProductLIst';
import ProductItem from '../components/productsUI/ProductItem';
class Category extends Component {
    state = {
        banner: '',
        products: [],
        bannerid: ''
    }

    async componentDidMount() {
        const id = this.props.location.key;
        const name = this.props.match.params.id.toLowerCase();
        let banner_url = null;
        if (!this.props.location.state) {
            const req = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&query=${name}`);
            const data = await req.data;
            data.includes.Asset.forEach(el => {
                if (el.fields.title.toLowerCase() === name) {
                    banner_url = el.fields.file.url;
                }
            })
        }

        const req2 = await axios.get(`https://cdn.contentful.com/spaces/mcnnkxbgt6j9/environments/master/entries?access_token=i9OcygGKAEo767VqSRTAMWuipiTiDXBG_MLaljvSydE&metadata.tags.sys.id[all]=${this.props.match.params.id.toLowerCase()}`);
        const data2 = await req2.data;
        const processCategory = new ProcessData()
        const processedData = data2.items.map(el => processCategory.PROC_DATA(el.sys.id, el.fields, data2.includes.Asset));
        this.setState({ banner: this.props.location.state ? this.props.location.state : banner_url, bannerid: id, products: processedData })
    }

    render() {
        const bg = {
            height: '60vh',
            width: '100vw',
            backgroundImage: `url(${this.state.banner})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }
        return (
            <section>
                <div className="poster" style={bg}></div>
                <div className="container">
                    <ProductHeader top={this.props.match.params.id} />
                    <ProductLIst column="col-4">
                        {
                            this.state.products.map(el => <ProductItem key={el.id} {...el} />)
                        }
                    </ProductLIst>
                </div>
            </section>
        )
    }
}
export default Category
import React, { Component } from 'react'
import css from '../css/Image.module.css'
export default class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.images[0].url,
            name: 'thumb-1'
        }
    }
    handelClickImage = (url, name) => {
        this.setState({current: url, name})
    }
    render() {
        return (
        <div className="product-image" style={{display: 'flex'}}>
                <div className={css.thumbWrapper} style={{ width: 150, overflowX: 'hidden' }}>
                    {
                        this.props.images.map((img, index) => {
                            return <img src={img.url} key={index} alt={img.name} style={{ width: 100, height: 150 }} className={css.thumb} onClick={() => this.handelClickImage(img.url, `thumb-${index + 1}`)} id={this.state.name === `thumb-${index + 1}` ? css.active_thumb : 'null'}  />
                        })
                    }
            </div>
                <div className="img-preview" style={{ padding: '0 10px', textAlign: 'center'}}>
                    <img src={this.state.current} alt={this.state.current.name} className={css.preview}/>
            </div>
        </div>
        )
    }
}



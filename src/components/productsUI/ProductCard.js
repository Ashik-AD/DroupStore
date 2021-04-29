import React from 'react'
import './css/ProductCard.css'
function ProductCard({ name, link, asset: { url }, style }) {
    const styles = {
        cursor: 'pointer',
        ...style
    }
    const banner = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    const handelLink = () => {
        window.open(`https://${link}`);
    }
    return (
        <div className="product-card" style={styles} onClick = {handelLink}>
            <div className="product-banner" style={banner}>
                {name}
            </div>
            <div className="meta">
                <h3>{name}</h3>
                <small className="link">{link}</small>
            </div>
        </div>
    )
}

export default ProductCard

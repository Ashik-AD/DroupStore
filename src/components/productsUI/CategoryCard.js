import React from 'react'
import {useHistory} from 'react-router-dom';
import './css/Category.css'
function CategoryCard({name, image, banner}) {
    const imgStyle = {
        backgroundImage: `url(${image[1].url
    })`,
        lineHeight: '150px'
    }
    const history = useHistory();
    const handelClick = () => {
        history.push(`/category/${name}`);
        history.location.key = banner;
        history.location.state = image[0].url;
    }
    return (

        <div style={{textAlign: 'center', margin: "10px 20px"}}  onClick={handelClick}> 
            <div className="bg" style={imgStyle}>
                <p className="cat-name">{name}</p>
            </div>
        </div>
        
    )
}

export default CategoryCard

import React from 'react'
import {Link} from 'react-router-dom'
import css from './Banner.module.css'
function Banner(props) {
    const { name, imgURL } = props;
    const nameWithoutHyphen = name ? name.toString().replace(/-/g, ' ') : '';
    const bg = {
        backgroundImage: `url(${imgURL})`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
    const btnStyle = {
        padding: '8px 20px',
        border: '2px solid #fff',
        textTransform: 'uppercase',
        backgroundColor: '#04040429',
        fontWeight: 600,
        fontSize: 17,
        backdropFilter: 'blur(30px)',
        color: '#fff',
        cursor: 'pointer'
    }
    const handelClick = () => {
        console.log(props)
    }
    return (
        <>
            <Link to={`collection/${name}`} onClick={handelClick}>
                <section className={css.Banner} style={bg}>
                    <button style={btnStyle}>{nameWithoutHyphen}</button>
                </section>
            </Link>
        </>
    )
}

export default Banner

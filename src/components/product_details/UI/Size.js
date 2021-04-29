import React from 'react'
import Title from './Title';
import css from '../css/Size.module.css'
function Size({ size, handleSize }) {
    return (
        <div className="size">
            <Title title="Size" />
            <div className="size_wrapper" style={{display:"flex"}}>
                {
                    size.map((el, index) => {
                        return <span key={index}
                            className={css.Size}
                            onClick={() => handleSize(size)}>{el}</span>
                    })
                }
            </div>
        </div>
    )
}

export default Size

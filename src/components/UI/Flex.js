import React from 'react'

function Flex(props) {
    const flex = {
        display: 'flex',
        alignItems: 'center'
    }
    return (
        <div style={flex}>
            {props.children}
        </div>
    )
}

export default Flex

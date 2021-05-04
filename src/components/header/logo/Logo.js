import React from 'react';
const Logo = props => {
    const logoStyle = {
        height: 50,
        width: 50,
        marginRight: 20,
    }
    return (
        <div className="logo" style={props.style}>
            <img src="../images/logo.png" alt="logo" style={logoStyle} />
            <span style={{fontFamily: "'Train One', cursive",fontSize: '2.5rem'}}>Droup</span>
        </div>
    )
}

export default Logo;
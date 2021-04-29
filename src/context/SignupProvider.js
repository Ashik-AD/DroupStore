import React, { useState, useEffect } from 'react'
import Storage from '../utils/Storage';

export const SignupContext = React.createContext();

function SignupProvider(props) {
    const [isSignIn, setSignIn] = useState(false);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const getUser = new Storage('user').getItems();
        const isLogedin = localStorage.getItem('isLogedIn');
        if (getUser.length > 0 && getUser[0].name !== '' && isLogedin === 'true') {
            return handelSignIn();
        }
        return;
    }, []);

    const handelSignIn = () => {
        localStorage.setItem('isLogedIn', 'true')
        setSignIn(true)
    }
    const handleSignOut = () => {
        localStorage.setItem('isLogedIn', 'false');
        setSignIn(false);
    }
    const handleUserName = (name) => {
        setUserName(name);
    }
    return (
        <SignupContext.Provider value={{isSignIn, handelSignIn, handleSignOut, handleUserName, userName}}>
            {props.children}
        </SignupContext.Provider>
    )
}

export default SignupProvider

import React, { useState } from 'react';

export const UserContext = React.createContext();

const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState({});
    const handleSetCurrentUser = (user) => {
        const { displayName, id, email } = user;
        setCurrentUser({ id, displayName, email });
    }
    return (
        <UserContext.Provider value={{ currentUser, handleSetCurrentUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;
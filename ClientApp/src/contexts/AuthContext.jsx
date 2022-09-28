import React, { useState } from 'react';

const AuthContext = React.createContext(["", () => { }]);

const AuthContextProvider = (props) => {
    let auth;
    try { auth = localStorage.getItem("auth") } catch{ }
    if (auth == null) {
        auth = "";
    }
    const [state, setState] = useState(auth);
    return (
        <AuthContext.Provider value={[state, setState]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
import React, { useRef } from 'react'
import AuthAPI from '../services/AuthAPI'
import { useHistory } from "react-router-dom";

const LoginPage = () => {
    const history = useHistory();
    const authAPI = AuthAPI();
    const username = useRef();
    const password = useRef();

    const handleLoginOnClick = async () => {
        const authorized = await authAPI.login({ username: username.current.value, password: password.current.value });
        if (authorized) {
            history.push("/admin");
        }
        else {
            username.current.value = "";
            password.current.value = "";
            alert("nah");
        }
    }

    return (
        <>
            <div id="login_container"> 
                <h2>Login</h2>
                <input type="text" ref={username} placeholder="Username" />
                <input type="password" ref={password} placeholder="Password" />
                <div id="login_button">
                    <button className="btn btn-primary" onClick={handleLoginOnClick}>Login</button>
                </div>
            </div>
        </>
    );
}

export default LoginPage;
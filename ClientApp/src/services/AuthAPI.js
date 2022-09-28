import { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";

const AuthAPI = () => {
    const [token, setToken] = useContext(AuthContext);

    const isAuthenticated = () => {
        let authenticated = false;
        if (token != "") {
            const jwtData = jwtDecode(token);
            if ((jwtData.exp * 1000) > new Date().getTime()) {
                authenticated = true;
            }
            else {
                setToken("");
            }
        }
        return authenticated;
    }

    const login = async (userData) => {
        let response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                return response.status == 200 ? response.json() : null})
            .catch(error => {
                console.error('Error:', error);
            });
        if (response == null) {
            setToken("");
            return false;
        }
        else
        {
            setToken(response.token)
            return true;
        }
    }

    const getAuthorizationToken = () => {
        return "Bearer " + token;
    }

    useEffect(() => {
        localStorage.setItem("auth", token);
    });

    return { isAuthenticated, login, getAuthorizationToken}
}

export default AuthAPI;
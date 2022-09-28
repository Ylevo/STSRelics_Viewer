import React from 'react';
import AuthAPI from "../services/AuthAPI"
import { Redirect } from "react-router-dom"

const RequireAuth = ({ children }) => {
    const { isAuthenticated } = AuthAPI();
    return isAuthenticated() ? children : <Redirect to="/login"/>;
}
export default RequireAuth;
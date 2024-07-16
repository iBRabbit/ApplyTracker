import React, { useState } from "react";
import DynamicBox from "../../components/DynamicAuthForm";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/AuthContext';
import { useEffect } from 'react';

import axiosInstance from "../../api/axiosConfig";

function Login() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const { isAuthenticated, setIsAuthenticated } = useAuth();

    // Redirect to dashboard if user is already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
        };

        try {
            const response = await axiosInstance.post('/auth/login', data);
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                navigate('/'); 
                setIsAuthenticated(true);
            }

        } catch (error) {
            setMessage(`Error: ${error.response.data.message}`);
        }
    };

    return (
        <div className="loginContainer">
            <Helmet><title>Login</title></Helmet>
            <DynamicBox title="Login" onSubmit={handleSubmit} message={message} success={success}/>
        </div>
    );
}

export default Login;

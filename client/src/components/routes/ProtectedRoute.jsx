import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../helpers/AuthContext';

import Loading from '../Loading';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) return <Loading />;
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;

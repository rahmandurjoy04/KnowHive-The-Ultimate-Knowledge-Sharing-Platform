import React, { use } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({ children }) => {

    const { user, authLoading } = use(AuthContext);

    // Redirection to the desired location
    const location = useLocation();



    if (authLoading) {
        return <Loading></Loading>
    }


    if (!user) {
        return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivateRoute;
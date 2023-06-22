import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import useRole from '../Hooks/useRole';

const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isRoleLoading] = useRole();
    const location = useLocation();
    if (loading || isRoleLoading) {
        return (
            <div className='w-3/4 mt-10 mx-auto flex justify-center items-center'>
                <span className="loading loading-bars loading-sm"></span>
                <span className="loading loading-bars loading-md"></span>
                <span className="loading loading-bars loading-lg"></span>
                <span className="loading loading-bars loading-xs"></span>
            </div>
        );
    }
    else if (user && role === "admin") {
        return children;
    }

    return <Navigate state={{ from: location }} to='/'></Navigate>;
};

export default AdminRoute;
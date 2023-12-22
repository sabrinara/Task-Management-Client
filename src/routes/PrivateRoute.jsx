import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const PrivateRouters = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location.pathname);

    if (loading) {
        return <span className="loading loading-bars loading-lg"></span>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={location.pathname} ></Navigate>
    
};

export default PrivateRouters;

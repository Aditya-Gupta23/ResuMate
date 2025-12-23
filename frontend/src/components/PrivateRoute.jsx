import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const userAccessToken = localStorage.getItem("accessToken");
    return userAccessToken ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
